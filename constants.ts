import { Station, Train } from './types';

export const STATIONS: Station[] = [
  { id: '1', name: 'New Delhi', code: 'NDLS' },
  { id: '2', name: 'Mumbai Central', code: 'MMCT' },
  { id: '3', name: 'Howrah Junction', code: 'HWH' },
  { id: '4', name: 'Chennai Central', code: 'MAS' },
  { id: '5', name: 'Bengaluru City', code: 'SBC' },
  { id: '6', name: 'Secunderabad', code: 'SC' },
  { id: '7', name: 'Ahmedabad', code: 'ADI' },
  { id: '8', name: 'Pune Junction', code: 'PUNE' },
  { id: '9', name: 'Lucknow Charbagh', code: 'LKO' },
  { id: '10', name: 'Jaipur Junction', code: 'JP' },
];

export const TRAINS: Train[] = [
  {
    id: '101',
    number: '12951',
    name: 'Mumbai Rajdhani Express',
    type: 'Rajdhani',
    source: 'NDLS',
    destination: 'MMCT',
    departureTime: '16:30',
    arrivalTime: '08:35',
    duration: '16h 05m',
    classes: ['1A', '2A', '3A'],
    classFares: {
      '1A': 4750,
      '2A': 2850,
      '3A': 2100
    },
    classAvailability: {
      '1A': 12,
      '2A': 45,
      '3A': 120
    }
  },
  {
    id: '102',
    number: '12002',
    name: 'Bhopal Shatabdi Express',
    type: 'Shatabdi',
    source: 'NDLS',
    destination: 'BPL',
    departureTime: '06:00',
    arrivalTime: '14:40',
    duration: '8h 40m',
    classes: ['EC', 'CC'],
    classFares: {
      'EC': 2450,
      'CC': 1250
    },
    classAvailability: {
      'EC': 24,
      'CC': 180
    }
  },
  {
    id: '103',
    number: '12260',
    name: 'Sealdah Duronto Express',
    type: 'Duronto',
    source: 'NDLS',
    destination: 'SDAH',
    departureTime: '19:40',
    arrivalTime: '12:45',
    duration: '17h 05m',
    classes: ['1A', '2A', '3A', 'SL'],
    classFares: {
      '1A': 4200,
      '2A': 2600,
      '3A': 1900,
      'SL': 750
    },
    classAvailability: {
      '1A': 8,
      '2A': 32,
      '3A': 96,
      'SL': 240
    }
  },
  {
    id: '104',
    number: '12622',
    name: 'Tamil Nadu Express',
    type: 'Superfast',
    source: 'NDLS',
    destination: 'MAS',
    departureTime: '21:05',
    arrivalTime: '06:15',
    duration: '33h 10m',
    classes: ['2A', '3A', 'SL'],
    classFares: {
      '2A': 3150,
      '3A': 2150,
      'SL': 850
    },
    classAvailability: {
      '2A': 48,
      '3A': 128,
      'SL': 480
    }
  },
  {
    id: '105',
    number: '12432',
    name: 'Trivandrum Rajdhani',
    type: 'Rajdhani',
    source: 'NDLS',
    destination: 'TVC',
    departureTime: '11:00',
    arrivalTime: '05:45',
    duration: '42h 45m',
    classes: ['1A', '2A', '3A'],
    classFares: {
      '1A': 6200,
      '2A': 4100,
      '3A': 3100
    },
    classAvailability: {
      '1A': 10,
      '2A': 36,
      '3A': 72
    }
  },
  {
    id: '106',
    number: '12723',
    name: 'Telangana Express',
    type: 'Superfast',
    source: 'NDLS',
    destination: 'HYB',
    departureTime: '17:25',
    arrivalTime: '15:55',
    duration: '22h 30m',
    classes: ['1A', '2A', '3A', 'SL'],
    classFares: {
      '1A': 3800,
      '2A': 2400,
      '3A': 1700,
      'SL': 650
    },
    classAvailability: {
      '1A': 12,
      '2A': 48,
      '3A': 128,
      'SL': 360
    }
  },
];
