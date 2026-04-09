/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Booking } from './pages/Booking';
import { Confirmation } from './pages/Confirmation';
import { Train, Passenger, User, Booking as BookingType } from './types';
import { Button } from './components/ui/button';
import { Bookings } from './pages/Bookings';
import { Trips } from './pages/Trips';
import { Account } from './pages/Account';

type Page = 'home' | 'auth' | 'booking' | 'confirmation' | 'bookings' | 'account' | 'trips' | 'settings' | 'report' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<{
    passengers: Passenger[];
    seats: string[];
    selectedClass: string;
    pnr: string;
  } | null>(null);
  const [allBookings, setAllBookings] = useState<BookingType[]>([]);

  // Load user and bookings from session storage
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedBookings = sessionStorage.getItem('bookings');
    if (savedBookings) {
      setAllBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), ...userData };
    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    toast.success(`Welcome back, ${userData.name}!`);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    toast.info('Logged out successfully');
    setCurrentPage('home');
  };

  const handleSelectTrain = (train: Train, date: string, cls: string) => {
    if (!user) {
      toast.error('Please sign in to book a train');
      setCurrentPage('auth');
      return;
    }
    setSelectedTrain(train);
    setSelectedDate(date);
    setSelectedClass(cls);
    setCurrentPage('booking');
  };

  const handleConfirmBooking = (passengers: Passenger[], seats: string[], cls: string) => {
    if (!selectedTrain) return;
    
    const perPassengerFare = selectedTrain.classFares[cls] || 0;
    
    const pnr = Math.random().toString(36).substr(2, 10).toUpperCase();
    const newBooking: BookingType = {
      id: Math.random().toString(36).substr(2, 9),
      trainId: selectedTrain.id,
      passengers,
      date: selectedDate,
      selectedClass: cls,
      totalFare: perPassengerFare * passengers.length,
      status: 'Confirmed',
      pnr
    };

    const updatedBookings = [newBooking, ...allBookings];
    setAllBookings(updatedBookings);
    sessionStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setBookingDetails({ passengers, seats, selectedClass: cls, pnr });
    toast.success('Booking confirmed!');
    setCurrentPage('confirmation');
  };

  const handleNavigate = (page: string) => {
    const protectedPages = ['bookings', 'account', 'settings'];
    if (protectedPages.includes(page) && !user) {
      toast.error('Please sign in to access this page');
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onSelectTrain={handleSelectTrain} />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      case 'booking':
        return selectedTrain ? (
          <Booking 
            train={selectedTrain} 
            date={selectedDate} 
            initialClass={selectedClass}
            onConfirm={handleConfirmBooking}
            onCancel={() => setCurrentPage('home')}
          />
        ) : null;
      case 'confirmation':
        return selectedTrain && bookingDetails ? (
          <Confirmation 
            train={selectedTrain}
            date={selectedDate}
            passengers={bookingDetails.passengers}
            seats={bookingDetails.seats}
            selectedClass={bookingDetails.selectedClass}
            pnr={bookingDetails.pnr}
            onDone={() => {
              setSelectedTrain(null);
              setBookingDetails(null);
              setSelectedClass('');
              setCurrentPage('home');
            }}
          />
        ) : null;
      case 'bookings':
        return (
          <Bookings 
            bookings={allBookings} 
            onSearchTrains={() => setCurrentPage('home')} 
          />
        );
      case 'trips':
        return <Trips />;
      case 'account':
        return user ? <Account user={user} onLogout={handleLogout} /> : null;
      case 'settings':
      case 'report':
      case 'contact':
        return (
          <div className="container px-4 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4 capitalize">{currentPage}</h2>
            <p className="text-muted-foreground text-lg">This feature is coming soon to RailSmart!</p>
            <Button className="mt-8" onClick={() => setCurrentPage('home')}>Back to Home</Button>
          </div>
        );
      default:
        return <Home onSelectTrain={handleSelectTrain} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user || undefined}
      />
      
      <div className="lg:pl-64 transition-all duration-300">
        <Navbar 
          user={user || undefined} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="animate-in fade-in duration-500">
          {renderPage()}
        </main>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}

