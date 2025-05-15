import React, { useState } from 'react';
import { Bell, Home, Ticket, Trophy, Users, User, Menu, X, TrendingUp, Gift, Star, Crown, Moon, Sun } from 'lucide-react';

// 로또 번호별 색상 함수 (전역 사용)
const getLottoColor = (num) => {
  if (num <= 10) return 'from-yellow-400 to-yellow-600'; // 노란색
  if (num <= 20) return 'from-blue-400 to-blue-600';    // 파란색
  if (num <= 30) return 'from-red-400 to-red-600';      // 빨간색
  if (num <= 40) return 'from-gray-600 to-gray-800';    // 회색
  return 'from-green-400 to-green-600';                  // 초록색
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 토글
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 로또 번호별 색상 함수
  const getLottoColor = (num) => {
    if (num <= 10) return 'from-yellow-400 to-yellow-600'; // 노란색
    if (num <= 20) return 'from-blue-400 to-blue-600';    // 파란색
    if (num <= 30) return 'from-red-400 to-red-600';      // 빨간색
    if (num <= 40) return 'from-gray-600 to-gray-800';    // 회색
    return 'from-green-400 to-green-600';                  // 초록색
  };

  // 네비게이션 아이템 (하단 네비게이션은 5개로 제한)
  const navItems = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'lotto', icon: Ticket, label: '번호추천' },
    { id: 'event', icon: Gift, label: '이벤트' },
    { id: 'ranking', icon: Trophy, label: '랭킹' },
    { id: 'community', icon: Users, label: '커뮤니티' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-slate-50'}`}>
      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.5s ease-out forwards;
          }
          
          .animate-bounceIn {
            animation: bounceIn 0.5s ease-out forwards;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
      {/* 상단 헤더 */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b'} shadow-sm sticky top-0 z-50`}>
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={24} className={darkMode ? 'text-gray-300' : ''} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 text-transparent bg-clip-text">로또 드림</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <Bell size={24} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-right">
                <div className={`font-semibold ${darkMode ? 'text-gray-200' : ''}`}>45,700P</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>포인트</div>
              </div>
              <button
                onClick={() => setActiveTab('mypage')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  darkMode ? 'bg-gray-700' : 'bg-slate-100'
                }`}
              >
                <User size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="pb-20">
        {activeTab === 'home' && <HomePage darkMode={darkMode} />}
        {activeTab === 'lotto' && <LottoPage darkMode={darkMode} />}
        {activeTab === 'event' && <EventPage darkMode={darkMode} />}
        {activeTab === 'ranking' && <RankingPage darkMode={darkMode} />}
        {activeTab === 'community' && <CommunityPage darkMode={darkMode} />}
        {activeTab === 'mypage' && <MyPage darkMode={darkMode} />}
      </main>

      {/* 하단 네비게이션 */}
      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-t`}>
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                activeTab === item.id 
                  ? 'text-indigo-600' 
                  : darkMode ? 'text-gray-400' : 'text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-64 h-full">
            <div className="p-4">
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            {/* 메뉴 내용 */}
          </div>
        </div>
      )}
    </div>
  );
};

// 홈 페이지 컴포넌트
const HomePage = ({ darkMode }) => {
  const [showScanner, setShowScanner] = useState(false);
  
  // 영수증 스캔 핸들러
  const handleReceiptScan = () => {
    setShowScanner(true);
    // 실제로는 카메라 API나 파일 선택 API 호출
  };
  
  return (
    <div className="p-4 space-y-6">
      {/* 지난 주 당첨 결과 카드 */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">1,104회차 당첨 결과</h2>
            <p className="text-purple-100">2024.12.18 추첨</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">1등 당첨금</p>
            <p className="text-2xl font-bold">23.5억원</p>
            <p className="text-xs text-purple-100">당첨자 8명</p>
          </div>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm mb-2">당첨 번호</p>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              {[3, 11, 15, 27, 35, 42].map((num, index) => (
                <div key={index} className={`w-10 h-10 bg-gradient-to-b ${getLottoColor(num)} rounded-full flex items-center justify-center font-bold shadow-lg text-white`}>
                  {num}
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold px-2">+</div>
            <div className="w-10 h-10 bg-amber-400 text-slate-800 rounded-full flex items-center justify-center font-bold shadow-lg">
              7
            </div>
          </div>
        </div>
        
        {/* 당첨 확인 옵션 - 영수증 스캔 추가 */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">당첨 확인</span>
            <div className="flex space-x-2">
              <button 
                onClick={handleReceiptScan}
                className="bg-white/20 px-3 py-1 rounded-full text-xs hover:bg-white/30 flex items-center backdrop-blur-sm"
              >
                <span className="mr-1">📷</span>
                영수증 스캔
              </button>
              <button className="bg-white/20 px-3 py-1 rounded-full text-xs hover:bg-white/30 backdrop-blur-sm">
                직접 입력
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 내 구독 상태 */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-semibold flex items-center ${darkMode ? 'text-gray-200' : ''}`}>
            <Crown className="w-5 h-5 mr-2 text-amber-500" />
            프리미엄 구독중
          </h3>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>12개월권</span>
        </div>
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-slate-100'} rounded-lg h-2 mb-2`}>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-lg" style={{width: '75%'}}></div>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>274일 남음</p>
      </div>

      {/* 리워드 풀 현황 */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}>
          <div className="flex items-center justify-between mb-2">
            <Gift className="w-6 h-6 text-emerald-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>이번 주</span>
          </div>
          <h4 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'} mb-1`}>이벤트 풀</h4>
          <p className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-slate-800'}`}>2,847만원</p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'} mt-1`}>45명 추첨</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}>
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>이번 달</span>
          </div>
          <h4 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'} mb-1`}>추천 보상</h4>
          <p className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-slate-800'}`}>5,724만원</p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'} mt-1`}>상위 20명</p>
        </div>
      </div>

      {/* 나의 활동 */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}>
        <h3 className={`font-semibold mb-4 ${darkMode ? 'text-gray-200' : ''}`}>나의 활동</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-50'} rounded-full flex items-center justify-center`}>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>이번 달 추천</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>5명 추천 완료</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-indigo-600">15위</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>예상 보상 50만원</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 ${darkMode ? 'bg-emerald-900' : 'bg-emerald-50'} rounded-full flex items-center justify-center`}>
                <Trophy className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="ml-3">
                <p className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>예측 리그</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>골드 리그</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-emerald-600">152위</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>적중률 24.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 당첨 후기 */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : ''}`}>최근 당첨 후기</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">더보기</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className={`w-10 h-10 ${darkMode ? 'bg-amber-900' : 'bg-amber-50'} rounded-full flex items-center justify-center`}>
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>김**님 3등 당첨!</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>AI 추천 번호로 1.5억원 당첨</p>
            </div>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>2시간 전</span>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-50'} rounded-full flex items-center justify-center`}>
              <Star className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>이**님 4등 당첨!</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>맞춤 번호로 행운의 주인공</p>
            </div>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>5시간 전</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 번호 추천 페이지
const LottoPage = ({ darkMode }) => {
  const [selectedMode, setSelectedMode] = useState('ai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [generatedSets, setGeneratedSets] = useState([]);
  
  const modes = [
    { id: 'ai', name: 'AI 예측', desc: '딥러닝 분석', badge: 'HOT' },
    { id: 'stats', name: '통계 기반', desc: '빅데이터 분석' },
    { id: 'custom', name: '맞춤 번호', desc: '개인 선호 반영' },
    { id: 'intuition', name: '오늘의 직관', desc: '행운의 번호' }
  ];

  const generateNumbers = () => {
    setIsGenerating(true);
    setShowNumbers(false);
    
    // 애니메이션을 위한 지연
    setTimeout(() => {
      // 번호 생성
      const newSets = [];
      for (let i = 0; i < 3; i++) {
        const numbers = [];
        const used = new Set();
        while (numbers.length < 6) {
          const num = Math.floor(Math.random() * 45) + 1;
          if (!used.has(num)) {
            used.add(num);
            numbers.push(num);
          }
        }
        newSets.push({
          numbers: numbers.sort((a, b) => a - b),
          confidence: Math.floor(Math.random() * 20) + 80
        });
      }
      setGeneratedSets(newSets);
      setIsGenerating(false);
      setShowNumbers(true);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* 모드 선택 */}
      <div className="grid grid-cols-2 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMode === mode.id
                ? 'border-indigo-500 bg-indigo-50'
                : darkMode 
                  ? 'border-gray-700 bg-gray-800' 
                  : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : ''}`}>{mode.name}</h4>
              {mode.badge && (
                <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded-full">
                  {mode.badge}
                </span>
              )}
            </div>
            <p className={`text-sm text-left ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{mode.desc}</p>
          </button>
        ))}
      </div>

      {/* 번호 생성 버튼 */}
      <button 
        onClick={generateNumbers}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isGenerating ? '생성 중...' : '번호 생성하기'}
      </button>

      {/* 생성 애니메이션 */}
      {isGenerating && (
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm p-4 border`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : ''}`}>추천 {index}</span>
                  <div className={`ml-3 w-20 h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-indigo-500 animate-pulse" style={{width: `${Math.random() * 100}%`}}></div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center animate-pulse`}
                  >
                    <div className={`w-8 h-8 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full`}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 생성된 번호들 */}
      {showNumbers && !isGenerating && (
        <div className="space-y-4">
          {generatedSets.map((set, index) => (
            <div 
              key={index} 
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border transform transition-all duration-500`}
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                '@keyframes slideInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(20px)'
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : ''}`}>추천 {index + 1}</span>
                  <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    신뢰도 {set.confidence}%
                  </span>
                </div>
                <button className="text-indigo-600 text-sm hover:text-indigo-700">복사</button>
              </div>
              <div className="flex space-x-2">
                {set.numbers.map((num, numIndex) => (
                  <div
                    key={numIndex}
                    className={`w-12 h-12 bg-gradient-to-b ${getLottoColor(num)} text-white rounded-full flex items-center justify-center font-bold shadow-md transform transition-all duration-500`}
                    style={{
                      animation: `bounceIn 0.5s ease-out ${index * 0.1 + numIndex * 0.1}s both`,
                      '@keyframes bounceIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'scale(0)'
                        },
                        '50%': {
                          transform: 'scale(1.1)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'scale(1)'
                        }
                      }
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className={`mt-3 text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'} animate-fadeIn`}>
                최근 10회 시뮬레이션: 5등 2회 적중
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 번호 분석 */}
      {showNumbers && (
        <div 
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'} rounded-xl shadow-sm p-4 border`}
          style={{
            animation: 'fadeIn 0.5s ease-out 1s both',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
        >
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : ''}`}>번호 분석</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>홀짝 비율</span>
              <span className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>3:3 (균형)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>고저 비율</span>
              <span className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>4:2 (고번호 우세)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>연속 번호</span>
              <span className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>없음</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>최근 출현</span>
              <span className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>7, 23 (2주 전)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 랭킹 페이지
const RankingPage = () => {
  return (
    <div className="p-4 space-y-6">
      {/* 예측왕 리그 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
        <h2 className="text-xl font-bold mb-1">예측왕 리그</h2>
        <p className="text-blue-100 text-sm">AI 예측 정확도로 경쟁하세요!</p>
      </div>

      {/* 내 순위 카드 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">내 순위</p>
            <p className="text-3xl font-bold">152위</p>
            <p className="text-blue-100 text-sm mt-1">골드 리그</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">이번 주 적중률</p>
            <p className="text-2xl font-bold">24.5%</p>
            <p className="text-blue-100 text-sm mt-1">+2.3%</p>
          </div>
        </div>
      </div>

      {/* 상위 랭커 목록 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold">이번 주 TOP 10</h3>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div key={rank} className="flex items-center p-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                rank <= 3 ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {rank}
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium">로또마스터{rank}</p>
                <p className="text-sm text-gray-500">다이아몬드 리그</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">45.2%</p>
                <p className="text-xs text-gray-500">적중률</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 리그별 보상 안내 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-3">이번 주 리그별 보상</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              다이아몬드 (상위 1%)
            </span>
            <div className="text-right">
              <span className="font-medium">100,000P</span>
              <span className="text-xs text-gray-500 block">98명 대상</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              플래티넘 (상위 5%)
            </span>
            <div className="text-right">
              <span className="font-medium">50,000P</span>
              <span className="text-xs text-gray-500 block">392명 대상</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              골드 (상위 10%)
            </span>
            <div className="text-right">
              <span className="font-medium">30,000P</span>
              <span className="text-xs text-gray-500 block">490명 대상</span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t text-xs text-gray-600">
          총 보상 풀: 127,400,000P (전체 회원의 2.3% 참여)
        </div>
      </div>
    </div>
  );
};

// 이벤트 페이지
const EventPage = () => {
  const [activeEvent, setActiveEvent] = useState('weekly');
  
  return (
    <div className="p-4 space-y-6">
      {/* 이벤트 타입 선택 */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveEvent('weekly')}
          className={`flex-1 py-2 rounded-md transition-all ${
            activeEvent === 'weekly'
              ? 'bg-white shadow-sm font-medium'
              : 'text-gray-600'
          }`}
        >
          주간 이벤트
        </button>
        <button
          onClick={() => setActiveEvent('monthly')}
          className={`flex-1 py-2 rounded-md transition-all ${
            activeEvent === 'monthly'
              ? 'bg-white shadow-sm font-medium'
              : 'text-gray-600'
          }`}
        >
          월간 추천왕
        </button>
      </div>

      {activeEvent === 'weekly' && (
        <>
          {/* 이번 주 이벤트 풀 */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">이번 주 이벤트 풀</h2>
                <p className="text-green-100">12월 3주차 추첨</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-100">총 상금</p>
                <p className="text-3xl font-bold">2,847만원</p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-sm mb-2">추첨까지 남은 시간</p>
              <div className="text-2xl font-bold">
                2일 14시간 32분
              </div>
            </div>
            
            <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100">
              추첨 참여 확인
            </button>
          </div>

          {/* 당첨 구조 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">이번 주 당첨 구조</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white mr-3">1</div>
                  1등 (1명)
                </span>
                <span className="font-semibold">700만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center font-bold text-white mr-3">2</div>
                  2등 (2명)
                </span>
                <span className="font-semibold">300만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center font-bold text-white mr-3">3</div>
                  3등 (3명)
                </span>
                <span className="font-semibold">150만원</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>... 6등까지 총 45명</span>
                <span>상세보기</span>
              </div>
            </div>
          </div>

          {/* 지난 주 당첨자 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">지난 주 당첨자</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium">김** (서울)</p>
                  <p className="text-sm text-gray-500">1등 - 650만원</p>
                </div>
                <span className="text-sm text-gray-400">12/11</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-gray-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium">이** (부산)</p>
                  <p className="text-sm text-gray-500">2등 - 280만원</p>
                </div>
                <span className="text-sm text-gray-400">12/11</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeEvent === 'monthly' && (
        <>
          {/* 월간 추천왕 현황 */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">12월 추천왕 경쟁</h2>
                <p className="text-purple-100">마감까지 11일 남음</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-100">총 상금</p>
                <p className="text-3xl font-bold">5,724만원</p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">내 추천 실적</span>
                <span className="font-semibold">5명 (15위)</span>
              </div>
              <div className="bg-white/30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
              <p className="text-xs mt-2">10위 진입까지 3명 더 필요</p>
            </div>
          </div>

          {/* 실시간 순위 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">실시간 추천왕 순위</h3>
            <div className="space-y-3">
              {[1,2,3,4,5].map((rank) => (
                <div key={rank} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    rank <= 3 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {rank}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">추천왕{rank}</p>
                    <p className="text-sm text-gray-500">신규 가입 45명</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">500만원</p>
                    <p className="text-xs text-gray-500">예상 상금</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border border-gray-300 py-2 rounded-lg text-gray-700">
              전체 순위 보기
            </button>
          </div>

          {/* 추천 현황 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">내 추천 현황</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">5명</p>
                <p className="text-sm text-gray-600">이번 달 추천</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">3명</p>
                <p className="text-sm text-gray-600">유료 전환</p>
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">
              추천 링크 공유하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// 커뮤니티 페이지
const CommunityPage = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([
    { id: 1, category: 'analysis', title: '이번 회차 유력 번호 분석', author: '분석가', views: 2345, comments: 45, likes: 127, createdAt: '2시간 전', isPinned: true },
    { id: 2, category: 'review', title: '3등 당첨! AI 추천 번호로 성공했습니다', author: '행운아', views: 5678, comments: 89, likes: 342, createdAt: '5시간 전', hasImage: true },
    { id: 3, category: 'free', title: '지난주 당첨 번호 패턴 공유합니다', author: '통계맨', views: 1234, comments: 23, likes: 56, createdAt: '1일 전' },
    { id: 4, category: 'tips', title: '로또 구매 팁 - 판매점 선택 방법', author: '베테랑', views: 3456, comments: 67, likes: 198, createdAt: '2일 전' },
    { id: 5, category: 'analysis', title: '최근 10회차 통계 분석 결과', author: '데이터러', views: 4567, comments: 78, likes: 256, createdAt: '3일 전' }
  ]);

  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'review', name: '당첨후기', icon: '🎉' },
    { id: 'analysis', name: '분석/예측', icon: '📊' },
    { id: 'tips', name: '팁/정보', icon: '💡' },
    { id: 'free', name: '자유게시판', icon: '💬' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="p-4 space-y-4">
      {/* 카테고리 탭 */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-1 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-slate-100 text-slate-600'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* 검색 및 글쓰기 */}
      <div className="flex items-center space-x-3">
        <div className={`flex-1 flex items-center space-x-2 px-4 py-2 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-slate-100'
        }`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="게시글 검색"
            className={`flex-1 bg-transparent outline-none text-sm ${
              darkMode ? 'text-gray-200 placeholder-gray-500' : 'placeholder-gray-400'
            }`}
          />
        </div>
        <button className="bg-indigo-600 text-white p-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div key={post.id} className={`rounded-xl p-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } ${post.isPinned ? 'border-2 border-indigo-500' : 'border border-gray-200'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {post.isPinned && (
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">공지</span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.category === 'review' ? 'bg-green-100 text-green-700' :
                    post.category === 'analysis' ? 'bg-blue-100 text-blue-700' :
                    post.category === 'tips' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {post.title}
                </h3>
                <div className={`flex items-center space-x-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>{post.author}</span>
                  <span>조회 {post.views}</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
              {post.hasImage && (
                <div className={`w-16 h-16 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                } flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <button className={`flex items-center space-x-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes}</span>
              </button>
              <button className={`flex items-center space-x-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments}</span>
              </button>
              <button className={`flex items-center space-x-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>공유</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
        darkMode
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}>
        더 많은 게시글 보기
      </button>
    </div>
  );
};

// 마이페이지
const MyPage = () => {
  return (
    <div className="p-4 space-y-6">
      {/* 프로필 카드 */}
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
        <h3 className="font-semibold text-lg mb-1">로또드리머</h3>
        <p className="text-sm text-gray-500 mb-4">가입일: 2024.01.15</p>
        <div className="flex justify-around">
          <div>
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-500">추천인</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-500">당첨</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">152</p>
            <p className="text-sm text-gray-500">랭킹</p>
          </div>
        </div>
      </div>

      {/* 메뉴 목록 */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        <button className="w-full p-4 flex items-center justify-between">
          <span className="font-medium">구독 관리</span>
          <span className="text-sm text-gray-500">12개월권</span>
        </button>
        <button className="w-full p-4 flex items-center justify-between">
          <span className="font-medium">추천 코드</span>
          <span className="text-sm text-blue-600">LOTTO2024</span>
        </button>
        <button className="w-full p-4 flex items-center justify-between">
          <span className="font-medium">포인트 내역</span>
          <span className="text-sm text-gray-500">45,700P</span>
        </button>
        <button className="w-full p-4 flex items-center justify-between">
          <span className="font-medium">당첨 내역</span>
          <span className="text-sm text-gray-500">3건</span>
        </button>
      </div>
    </div>
  );
};

export default App;