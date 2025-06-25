import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { 
  Train, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Users, 
  Mountain, 
  Waves, 
  Camera,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
  Share2,
  Download,
  Phone,
  Mail,
  Navigation,
  Umbrella,
  AlertTriangle,
  CheckCircle,
  Info,
  Calculator,
  Smartphone,
  Wifi,
  MapIcon,
  Zap,
  TrendingUp,
  Award,
  Shield
} from 'lucide-react'
import './App.css'

function App() {
  const [selectedDay, setSelectedDay] = useState('day1')
  const [expandedSections, setExpandedSections] = useState({})
  const [favorites, setFavorites] = useState([])
  const [totalBudget, setTotalBudget] = useState(6030)
  const [budgetLevel, setBudgetLevel] = useState('budget')
  const [groupSize, setGroupSize] = useState([2])
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false)
  const [isLuxury, setIsLuxury] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    // Animate stats on load
    setTimeout(() => setAnimateStats(true), 500)
  }, [])

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleFavorite = (item) => {
    setFavorites(prev => 
      prev.includes(item) 
        ? prev.filter(f => f !== item)
        : [...prev, item]
    )
  }

  const calculateBudget = () => {
    const basePrice = isLuxury ? 9670 : 6030
    const groupDiscount = groupSize[0] > 2 ? 0.9 : 1
    return Math.round(basePrice * groupDiscount * groupSize[0])
  }

  const budgetBreakdown = {
    transportation: { min: 1330, max: 2070 },
    accommodation: { min: isLuxury ? 3000 : 1500, max: isLuxury ? 5000 : 2500 },
    activities: { min: 2000, max: 3000 },
    food: { min: 1000, max: 1600 },
    miscellaneous: { min: 200, max: 500 }
  }

  const itineraryDays = {
    day0: {
      title: "Ahmedabad to Mumbai",
      subtitle: "Overnight Express Journey",
      icon: <Train className="w-6 h-6" />,
      color: "bg-blue-500",
      activities: [
        {
          time: "8:00 PM - 11:00 PM",
          title: "Board Overnight Train",
          description: "Gujarat Mail (12902) or BVC BDTS SF EXP (12972)",
          cost: "₹400 - ₹600",
          tips: ["Book Sleeper Class for budget travel", "Carry your own food to save money", "Download offline entertainment"],
          mobileOptimized: true
        }
      ]
    },
    day1: {
      title: "Matheran Horse Adventure",
      subtitle: "Misty Hills & Horseback Exploration",
      icon: <Mountain className="w-6 h-6" />,
      color: "bg-green-500",
      activities: [
        {
          time: "6:15 AM - 10:30 AM",
          title: "Mumbai to Neral",
          description: "Local train journey through Mumbai suburbs",
          cost: "₹50 - ₹100",
          tips: ["Take local train from Dadar/CST", "Keep small change ready", "Use mobile apps for train timings"]
        },
        {
          time: "10:30 AM - 12:00 PM",
          title: "Neral to Matheran",
          description: "Shared taxi to Aman Lodge + entry fee",
          cost: "₹150 - ₹200",
          tips: ["Toy train suspended in monsoon", "Negotiate shared taxi rates", "Keep raincoat handy"]
        },
        {
          time: "2:00 PM - 6:00 PM",
          title: "Horse Riding Tour",
          description: "Visit Panorama Point, Louisa Point, Echo Point",
          cost: "₹500 - ₹1000",
          tips: ["Negotiate for half-day package", "Visit sunset point for best views", "Take photos at viewpoints"]
        }
      ]
    },
    day2: {
      title: "Matheran on Foot & Imagica",
      subtitle: "Nature Walk & Theme Park Thrills",
      icon: <Waves className="w-6 h-6" />,
      color: "bg-purple-500",
      activities: [
        {
          time: "9:00 AM - 12:00 PM",
          title: "Explore Matheran on Foot",
          description: "Peaceful walks through vehicle-free hill station",
          cost: "Free",
          tips: ["Wear comfortable waterproof shoes", "Enjoy the fresh mountain air", "Visit local markets"]
        },
        {
          time: "1:00 PM - 3:00 PM",
          title: "Travel to Imagica",
          description: "Neral to Khopoli, then to Imagica resort area",
          cost: "₹180 - ₹310",
          tips: ["Take local train to Khopoli", "Shared auto to Imagica area", "Book hotel near Imagica"]
        }
      ]
    },
    day3: {
      title: "Imagica & Return",
      subtitle: "Theme Park Adventure & Journey Home",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-red-500",
      activities: [
        {
          time: "10:00 AM - 6:00 PM",
          title: "Adlabs Imagica Theme Park",
          description: "Full day of rides, shows, and attractions",
          cost: "₹1500 - ₹2000",
          tips: ["Check for monsoon discounts", "Pack snacks to save money", "Use mobile app for queue times"]
        },
        {
          time: "10:00 PM onwards",
          title: "Return to Ahmedabad",
          description: "Overnight train back home",
          cost: "₹400 - ₹600",
          tips: ["Book return tickets in advance", "Gujarat Mail recommended", "Rest well for next day"]
        }
      ]
    }
  }

  const alternatives = [
    {
      title: "Extended 4-Day Trip",
      description: "Add an extra day in Lonavala for more relaxation",
      additionalCost: "₹1500 - ₹2500",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Water Park Option",
      description: "Visit Imagica Water Park instead of theme park",
      costDifference: "₹200 - ₹500 less",
      icon: <Waves className="w-5 h-5" />
    },
    {
      title: "Luxury Upgrade",
      description: "Stay in heritage hotels in Matheran",
      additionalCost: "₹3000 - ₹5000",
      icon: <Award className="w-5 h-5" />
    }
  ]

  const mobileFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Perfect for planning on-the-go"
    },
    {
      icon: <MapIcon className="w-6 h-6" />,
      title: "Offline Maps",
      description: "Download maps before traveling"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Free WiFi Spots",
      description: "Railway stations and hotels"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety Tips",
      description: "Monsoon travel precautions"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Monsoon Magic</h1>
                <p className="text-sm text-gray-600">Budget Adventure to Matheran & Imagica</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowBudgetCalculator(!showBudgetCalculator)}
                className="hidden sm:flex"
              >
                <Calculator className="w-4 h-4 mr-1" />
                Calculator
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleFavorite('trip')}>
                <Heart className={`w-4 h-4 ${favorites.includes('trip') ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Budget Calculator Modal */}
      {showBudgetCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Budget Calculator
              </CardTitle>
              <CardDescription>Customize your trip budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Group Size: {groupSize[0]} people</label>
                <Slider
                  value={groupSize}
                  onValueChange={setGroupSize}
                  max={8}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Luxury Upgrade</label>
                <Switch checked={isLuxury} onCheckedChange={setIsLuxury} />
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{calculateBudget().toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total for {groupSize[0]} people</div>
              </div>
              <Button 
                onClick={() => setShowBudgetCalculator(false)}
                className="w-full"
              >
                Close Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌧️ Your Ultimate Budget Monsoon Adventure! 🎢
            </h2>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              3 Days of Misty Hills, Thrilling Rides & Unforgettable Memories
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <IndianRupee className="w-4 h-4 mr-1" />
                ₹6,030 - ₹9,670 per person
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="w-4 h-4 mr-1" />
                Perfect for July
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Train className="w-4 h-4 mr-1" />
                Train Travel
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Download Itinerary
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 sm:hidden"
                onClick={() => setShowBudgetCalculator(true)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 bg-blue-50 rounded-lg transition-all duration-1000 ${animateStats ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">3 Days</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className={`text-center p-4 bg-green-50 rounded-lg transition-all duration-1000 delay-200 ${animateStats ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">2 Cities</div>
              <div className="text-sm text-gray-600">Destinations</div>
            </div>
            <div className={`text-center p-4 bg-purple-50 rounded-lg transition-all duration-1000 delay-400 ${animateStats ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
              <Train className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">Overnight</div>
              <div className="text-sm text-gray-600">Train Journey</div>
            </div>
            <div className={`text-center p-4 bg-red-50 rounded-lg transition-all duration-1000 delay-600 ${animateStats ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
              <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">Budget</div>
              <div className="text-sm text-gray-600">Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-6">Mobile-Friendly Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mobileFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-2 flex justify-center">{feature.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          {/* Day Selector */}
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="day0" className="text-xs md:text-sm">Day 0</TabsTrigger>
            <TabsTrigger value="day1" className="text-xs md:text-sm">Day 1</TabsTrigger>
            <TabsTrigger value="day2" className="text-xs md:text-sm">Day 2</TabsTrigger>
            <TabsTrigger value="day3" className="text-xs md:text-sm">Day 3</TabsTrigger>
          </TabsList>

          {/* Day Content */}
          {Object.entries(itineraryDays).map(([dayKey, day]) => (
            <TabsContent key={dayKey} value={dayKey}>
              <Card className="mb-6">
                <CardHeader className={`${day.color} text-white rounded-t-lg`}>
                  <div className="flex items-center space-x-3">
                    {day.icon}
                    <div>
                      <CardTitle className="text-xl">{day.title}</CardTitle>
                      <CardDescription className="text-white/90">{day.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="border-l-4 border-gray-200 pl-4 py-2 hover:border-blue-400 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{activity.time}</Badge>
                          <Badge variant="secondary">{activity.cost}</Badge>
                        </div>
                        <h4 className="font-semibold text-lg mb-1">{activity.title}</h4>
                        <p className="text-gray-600 mb-3">{activity.description}</p>
                        <Collapsible>
                          <CollapsibleTrigger className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                            <Info className="w-4 h-4 mr-1" />
                            Money-Saving Tips
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {activity.tips.map((tip, tipIndex) => (
                                <li key={tipIndex}>{tip}</li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Budget Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <IndianRupee className="w-5 h-5 mr-2" />
              Budget Breakdown (Per Person)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(budgetBreakdown).map(([category, costs]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium capitalize">{category.replace('_', ' ')}</span>
                  <span className="font-bold text-green-600">
                    ₹{costs.min.toLocaleString()} - ₹{costs.max.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Estimated Cost</span>
                  <span className="text-green-600">₹6,030 - ₹9,670</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Alternative Options</CardTitle>
            <CardDescription>Customize your trip based on your preferences and budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {alternatives.map((alt, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all hover:border-blue-300">
                  <div className="flex items-center mb-3">
                    <div className="text-blue-600 mr-2">{alt.icon}</div>
                    <h4 className="font-semibold">{alt.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{alt.description}</p>
                  <Badge variant="outline">
                    {alt.additionalCost || alt.costDifference}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monsoon Tips */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <Umbrella className="w-5 h-5 mr-2" />
              Essential Monsoon Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  What to Pack
                </h4>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Waterproof raincoat and umbrella</li>
                  <li>• Sturdy, waterproof shoes with good grip</li>
                  <li>• Quick-dry clothes and extra socks</li>
                  <li>• Waterproof bag for electronics</li>
                  <li>• Power bank for mobile devices</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                  Important Notes
                </h4>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Matheran Toy Train suspended in monsoon</li>
                  <li>• Paths can be slippery, walk carefully</li>
                  <li>• Book accommodations in advance</li>
                  <li>• Check Imagica for weather-related closures</li>
                  <li>• Keep emergency contacts handy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Book Your Adventure?</CardTitle>
            <CardDescription>Get started with your budget monsoon getaway today!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="w-full" size="lg">
                <Train className="w-4 h-4 mr-2" />
                Book Train Tickets
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <MapPin className="w-4 h-4 mr-2" />
                Find Hotels
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Camera className="w-4 h-4 mr-2" />
                Get Imagica Tickets
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Need help planning? Contact us:</p>
              <div className="flex justify-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 Budget Travel Adventures. Your gateway to affordable exploration!</p>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
              Terms of Service
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
              Contact Us
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

