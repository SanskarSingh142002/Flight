// Mock flight data simulating Duffel API response
export const AIRPORTS = [
  { code: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International', city: 'Bengaluru', country: 'India' },
  { code: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India' },
  { code: 'COK', name: 'Cochin International', city: 'Kochi', country: 'India' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India' },
  { code: 'GOI', name: 'Goa International (Dabolim)', city: 'Goa', country: 'India' },
  { code: 'PNQ', name: 'Pune International', city: 'Pune', country: 'India' },
  { code: 'JAI', name: 'Jaipur International', city: 'Jaipur', country: 'India' },
  { code: 'LKO', name: 'Chaudhary Charan Singh International', city: 'Lucknow', country: 'India' },
  { code: 'VNS', name: 'Lal Bahadur Shastri International', city: 'Varanasi', country: 'India' },
  { code: 'PAT', name: 'Jay Prakash Narayan International', city: 'Patna', country: 'India' },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi International', city: 'Guwahati', country: 'India' },
  { code: 'BBI', name: 'Biju Patnaik International', city: 'Bhubaneswar', country: 'India' },
  { code: 'RPR', name: 'Swami Vivekananda Airport', city: 'Raipur', country: 'India' },
  { code: 'IXR', name: 'Birsa Munda Airport', city: 'Ranchi', country: 'India' },
  { code: 'NAG', name: 'Dr. Babasaheb Ambedkar International', city: 'Nagpur', country: 'India' },
  { code: 'IDR', name: 'Devi Ahilya Bai Holkar International', city: 'Indore', country: 'India' },
  { code: 'SXR', name: 'Sheikh ul Alam International', city: 'Srinagar', country: 'India' },
  { code: 'IXC', name: 'Chandigarh International', city: 'Chandigarh', country: 'India' },
  { code: 'DED', name: 'Jolly Grant Airport', city: 'Dehradun', country: 'India' },
  { code: 'IXB', name: 'Bagdogra International', city: 'Siliguri', country: 'India' },
  { code: 'TRV', name: 'Trivandrum International', city: 'Thiruvananthapuram', country: 'India' },
  { code: 'CCJ', name: 'Calicut International', city: 'Kozhikode', country: 'India' },
  { code: 'IXE', name: 'Mangalore International', city: 'Mangaluru', country: 'India' },
  { code: 'IXM', name: 'Madurai International', city: 'Madurai', country: 'India' },
  { code: 'TRZ', name: 'Tiruchirappalli International', city: 'Tiruchirappalli', country: 'India' },
  { code: 'VGA', name: 'Vijayawada International', city: 'Vijayawada', country: 'India' },
  { code: 'VTZ', name: 'Visakhapatnam International', city: 'Visakhapatnam', country: 'India' },
  { code: 'CJB', name: 'Coimbatore International', city: 'Coimbatore', country: 'India' },
  { code: 'STV', name: 'Surat International', city: 'Surat', country: 'India' },
  { code: 'RAJ', name: 'Rajkot International', city: 'Rajkot', country: 'India' },
  { code: 'UDR', name: 'Maharana Pratap Airport', city: 'Udaipur', country: 'India' },
  { code: 'IXZ', name: 'Veer Savarkar International', city: 'Port Blair', country: 'India' },
  { code: 'AGR', name: 'Kheria Airport', city: 'Agra', country: 'India' },
  { code: 'AJL', name: 'Lengpui Airport', city: 'Aizawl', country: 'India' },
  { code: 'ATQ', name: 'Sri Guru Ram Dass Jee International', city: 'Amritsar', country: 'India' },
  { code: 'BDQ', name: 'Vadodara Airport', city: 'Vadodara', country: 'India' },
  { code: 'BEK', name: 'Bareilly Airport', city: 'Bareilly', country: 'India' },
  { code: 'BHO', name: 'Raja Bhoj Airport', city: 'Bhopal', country: 'India' },
  { code: 'BHU', name: 'Bhavnagar Airport', city: 'Bhavnagar', country: 'India' },
  { code: 'BKB', name: 'Nal Airport', city: 'Bikaner', country: 'India' },
  { code: 'DGH', name: 'Deoghar Airport', city: 'Deoghar', country: 'India' },
  { code: 'DIB', name: 'Dibrugarh Airport', city: 'Dibrugarh', country: 'India' },
  { code: 'DMU', name: 'Dimapur Airport', city: 'Dimapur', country: 'India' },
  { code: 'GAY', name: 'Gaya International Airport', city: 'Gaya', country: 'India' },
  { code: 'GOP', name: 'Mahayogi Gorakhnath Airport', city: 'Gorakhpur', country: 'India' },
  { code: 'HJR', name: 'Khajuraho Airport', city: 'Khajuraho', country: 'India' },
  { code: 'IMF', name: 'Bir Tikendrajit International', city: 'Imphal', country: 'India' },
  { code: 'IXA', name: 'Maharaja Bir Bikram Airport', city: 'Agartala', country: 'India' },
  { code: 'IXD', name: 'Prayagraj Airport', city: 'Prayagraj', country: 'India' },
  { code: 'IXJ', name: 'Jammu Airport', city: 'Jammu', country: 'India' },
  { code: 'IXL', name: 'Kushok Bakula Rimpochee Airport', city: 'Leh', country: 'India' },
  { code: 'IXI', name: 'Lilabari Airport', city: 'North Lakhimpur', country: 'India' },
  { code: 'IXS', name: 'Silchar Airport', city: 'Silchar', country: 'India' },
  { code: 'JDH', name: 'Jodhpur Airport', city: 'Jodhpur', country: 'India' },
  { code: 'JGA', name: 'Jamnagar Airport', city: 'Jamnagar', country: 'India' },
  { code: 'JLR', name: 'Jabalpur Airport', city: 'Jabalpur', country: 'India' },
  { code: 'JRG', name: 'Veer Surendra Sai Airport', city: 'Jharsuguda', country: 'India' },
  { code: 'JSA', name: 'Jaisalmer Airport', city: 'Jaisalmer', country: 'India' },
  { code: 'KNU', name: 'Kanpur Airport', city: 'Kanpur', country: 'India' },
  { code: 'KTU', name: 'Kota Airport', city: 'Kota', country: 'India' },
  { code: 'KUU', name: 'Kullu-Manali Airport', city: 'Kullu', country: 'India' },
  { code: 'MYQ', name: 'Mysuru Airport', city: 'Mysuru', country: 'India' },
  { code: 'NDC', name: 'Shri Guru Gobind Singh Ji Airport', city: 'Nanded', country: 'India' },
  { code: 'PAB', name: 'Bilasa Devi Kevat Airport', city: 'Bilaspur', country: 'India' },
  { code: 'PGH', name: 'Pantnagar Airport', city: 'Pantnagar', country: 'India' },
  { code: 'RDP', name: 'Kazi Nazrul Islam Airport', city: 'Durgapur', country: 'India' },
  { code: 'SAG', name: 'Shirdi Airport', city: 'Shirdi', country: 'India' },
  { code: 'SLV', name: 'Shimla Airport', city: 'Shimla', country: 'India' },
  { code: 'TCR', name: 'Tuticorin Airport', city: 'Thoothukudi', country: 'India' },
  { code: 'TIR', name: 'Tirupati Airport', city: 'Tirupati', country: 'India' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'USA' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'USA' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
]

export const AIRLINES = [
  { code: 'AI', name: 'Air India', logo: '🇮🇳' },
  { code: '6E', name: 'IndiGo', logo: '🔵' },
  { code: 'SG', name: 'SpiceJet', logo: '🔴' },
  { code: 'UK', name: 'Vistara', logo: '🟣' },
  { code: 'G8', name: 'Go First', logo: '🟠' },
  { code: 'EK', name: 'Emirates', logo: '🌍' },
  { code: 'SQ', name: 'Singapore Airlines', logo: '✈️' },
  { code: 'BA', name: 'British Airways', logo: '🇬🇧' },
]

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const formatTime = (hour, minute) => {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

const addMinutes = (time, mins) => {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + mins
  return formatTime(Math.floor(total / 60) % 24, total % 60)
}

const formatDuration = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export const generateFlights = (from, to, date, passengers = 1) => {
  if (!from || !to || from === to) return []

  const isInternational = from !== 'DEL' && to !== 'DEL' ||
    ['DXB', 'SIN', 'LHR', 'JFK', 'LGA', 'EWR', 'BKK', 'KUL'].includes(from) ||
    ['DXB', 'SIN', 'LHR', 'JFK', 'LGA', 'EWR', 'BKK', 'KUL'].includes(to)

  const airlines = isInternational
    ? [AIRLINES[0], AIRLINES[5], AIRLINES[6], AIRLINES[7]]
    : AIRLINES.slice(0, 5)

  const numFlights = randomBetween(4, 8)
  const flights = []

  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[i % airlines.length]
    const basePrice = isInternational
      ? randomBetween(18000, 85000)
      : randomBetween(2800, 12000)

    const durationMins = isInternational
      ? randomBetween(180, 720)
      : randomBetween(60, 300)

    const stops = i % 3 === 0 ? 1 : i % 5 === 0 ? 2 : 0
    const depHour = randomBetween(4, 22)
    const depMin = [0, 15, 30, 45][randomBetween(0, 3)]
    const departureTime = formatTime(depHour, depMin)
    const arrivalTime = addMinutes(departureTime, durationMins)

    const flightNumber = `${airline.code}${randomBetween(100, 999)}`
    const aircraft = ['Boeing 737', 'Airbus A320', 'Airbus A321', 'Boeing 787', 'Airbus A380'][randomBetween(0, 4)]

    flights.push({
      id: `FL${Date.now()}-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      airlineLogo: airline.logo,
      flightNumber,
      from,
      to,
      date,
      departureTime,
      arrivalTime,
      duration: formatDuration(durationMins),
      durationMins,
      stops,
      stopCity: stops > 0 ? ['BOM', 'DEL', 'HYD', 'BLR'][randomBetween(0, 3)] : null,
      aircraft,
      price: basePrice * passengers,
      pricePerPerson: basePrice,
      currency: 'INR',
      seatsLeft: randomBetween(2, 24),
      cabinClass: 'Economy',
      baggage: '15 kg',
      meal: stops > 0 || isInternational,
      refundable: i % 3 === 0,
    })
  }

  return flights.sort((a, b) => a.price - b.price)
}

// Mock bookings for admin panel
export const generateMockBookings = () => {
  const statuses = ['new', 'contacted', 'processing', 'completed', 'cancelled']
  const paymentStatuses = ['paid', 'pending', 'failed']
  const names = ['Rahul Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel', 'Vikram Joshi', 'Meera Nair', 'Rohan Gupta', 'Ananya Bose', 'Kiran Reddy', 'Deepak Verma']
  const routes = [
    { from: 'DEL', to: 'BOM' }, { from: 'BLR', to: 'DEL' },
    { from: 'BOM', to: 'GOI' }, { from: 'DEL', to: 'DXB' },
    { from: 'HYD', to: 'BOM' }, { from: 'CCU', to: 'BLR' },
    { from: 'DEL', to: 'SIN' }, { from: 'BOM', to: 'LHR' },
  ]

  return Array.from({ length: 24 }, (_, i) => {
    const route = routes[i % routes.length]
    const name = names[i % names.length]
    const status = statuses[i % statuses.length]
    const daysAgo = randomBetween(0, 30)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    const amount = randomBetween(3500, 95000)
    const cardBrands = ['Visa', 'Mastercard', 'RuPay', 'Amex']
    const lastFour = String(randomBetween(1000, 9999))

    return {
      id: `FC${String(i + 1).padStart(4, '0')}`,
      bookingRef: `FC${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status,
      createdAt: date.toISOString(),
      customer: {
        name,
        email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
        phone: `+91 ${randomBetween(70000, 99999)}${randomBetween(10000, 99999)}`,
      },
      passengers: [
        {
          name,
          dob: '1990-05-15',
          passport: status === 'new' ? '' : `A${randomBetween(1000000, 9999999)}`,
          nationality: 'Indian',
        }
      ],
      flight: {
        airline: AIRLINES[i % AIRLINES.length].name,
        flightNumber: `${AIRLINES[i % AIRLINES.length].code}${randomBetween(100, 999)}`,
        from: route.from,
        to: route.to,
        date: new Date(Date.now() + randomBetween(1, 60) * 86400000).toISOString().split('T')[0],
        departureTime: formatTime(randomBetween(5, 22), [0, 30][randomBetween(0, 1)]),
        arrivalTime: formatTime(randomBetween(5, 23), [0, 30][randomBetween(0, 1)]),
        duration: formatDuration(randomBetween(60, 360)),
        stops: randomBetween(0, 1),
        cabinClass: 'Economy',
      },
      payment: {
        amount,
        currency: 'INR',
        status: paymentStatuses[i % paymentStatuses.length],
        cardBrand: cardBrands[i % cardBrands.length],
        lastFour,
        expiryMonth: String(randomBetween(1, 12)).padStart(2, '0'),
        expiryYear: String(randomBetween(25, 29)),
        billingName: name,
        transactionId: `TXN${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      },
      notes: i % 4 === 0 ? 'Customer requested window seat. Called and confirmed.' : '',
      statusHistory: [
        { status: 'new', timestamp: date.toISOString(), changedBy: 'system' },
        ...(status !== 'new' ? [{ status, timestamp: new Date(date.getTime() + 3600000).toISOString(), changedBy: 'admin' }] : []),
      ]
    }
  })
}
