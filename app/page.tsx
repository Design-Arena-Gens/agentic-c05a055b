'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [ageData, setAgeData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  }, []);

  const calculateAge = () => {
    if (!birthDate || !targetDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert('Birth date cannot be after target date');
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][birth.getDay()];
    const zodiacSigns = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ];

    let zodiac = '';
    const birthMonth = birth.getMonth() + 1;
    const birthDay = birth.getDate();

    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if ((birthMonth === startMonth && birthDay >= startDay) ||
          (birthMonth === endMonth && birthDay <= endDay)) {
        zodiac = sign.name;
        break;
      }
    }

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      dayOfWeek,
      zodiac
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Age Calculator Pro
          </h1>
          <p className="text-xl text-gray-300">Calculate your age with precision and discover amazing facts</p>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-white text-lg transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">Calculate Age On</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white text-lg transition-all"
              />
            </div>
          </div>
          <button
            onClick={calculateAge}
            className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600"
          >
            Calculate Age
          </button>
        </div>

        {/* Results */}
        {ageData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Main Age Display */}
            <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-center">Your Age</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 hover:scale-105 transition-transform">
                  <div className="text-6xl font-bold text-pink-400 mb-2">{ageData.years}</div>
                  <div className="text-lg text-gray-300">Years</div>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 hover:scale-105 transition-transform">
                  <div className="text-6xl font-bold text-purple-400 mb-2">{ageData.months}</div>
                  <div className="text-lg text-gray-300">Months</div>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 hover:scale-105 transition-transform">
                  <div className="text-6xl font-bold text-cyan-400 mb-2">{ageData.days}</div>
                  <div className="text-lg text-gray-300">Days</div>
                </div>
              </div>
            </div>

            {/* Total Time Lived */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-center">Total Time Lived</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-pink-300">{ageData.totalMonths.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Months</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-purple-300">{ageData.totalWeeks.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Weeks</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-cyan-300">{ageData.totalDays.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Days</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-blue-300">{ageData.totalHours.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Hours</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-indigo-300">{ageData.totalMinutes.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Minutes</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-pink-300">{ageData.totalSeconds.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Seconds</div>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-center">Fun Facts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-white/20">
                  <div className="text-4xl mb-2">🎂</div>
                  <div className="text-2xl font-bold text-yellow-300 mb-2">{ageData.daysToNextBirthday}</div>
                  <div className="text-sm text-gray-300">Days Until Next Birthday</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl border border-white/20">
                  <div className="text-4xl mb-2">📅</div>
                  <div className="text-2xl font-bold text-green-300 mb-2">{ageData.dayOfWeek}</div>
                  <div className="text-sm text-gray-300">Born On</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/20">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-purple-300 mb-2">{ageData.zodiac}</div>
                  <div className="text-sm text-gray-300">Zodiac Sign</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">Built with Next.js & React | © 2024 Age Calculator Pro</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
