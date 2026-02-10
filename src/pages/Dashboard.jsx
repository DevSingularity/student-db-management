import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/slices/studentSlice';
import { dashboardSummary } from '../data/mockData';
import { Users, DollarSign, AlertCircle, Search, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchQuery, searchResults } = useSelector((state) => state.students);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    // Clear search on component mount
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  const handleSearch = (query) => {
    setLocalSearchQuery(query);
    dispatch(setSearchQuery(query));
  };

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Students',
      value: dashboardSummary.totalStudents,
      icon: Users,
      color: 'primary',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
      iconBg: 'bg-primary-100',
    },
    {
      title: 'Fees Collected',
      value: formatCurrency(dashboardSummary.totalFeesCollected),
      icon: DollarSign,
      color: 'success',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600',
      iconBg: 'bg-success-100',
    },
    {
      title: 'Pending Fees',
      value: formatCurrency(dashboardSummary.pendingFees),
      icon: AlertCircle,
      color: 'warning',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-600',
      iconBg: 'bg-warning-100',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of student database and fee management
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {card.title}
                </p>
                <p className={`text-3xl font-display font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.iconBg} p-3 rounded-lg`}>
                <card.icon className={`h-6 w-6 ${card.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Search Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
            Student Search
          </h2>
          <p className="text-gray-600 text-sm">
            Search by name, GR number, or phone number
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            placeholder="Search students..."
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  Found {searchResults.length} student{searchResults.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => handleStudentClick(student.id)}
                      className="w-full bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg p-4 text-left transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {student.fullName}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                student.feeStatus === 'Paid'
                                  ? 'bg-success-100 text-success-700'
                                  : student.feeStatus === 'Partial'
                                  ? 'bg-warning-100 text-warning-700'
                                  : 'bg-danger-100 text-danger-700'
                              }`}
                            >
                              {student.feeStatus}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="font-medium">GR:</span>
                              <span className="ml-1">{student.grNumber}</span>
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium">Class:</span>
                              <span className="ml-1">{student.class} - {student.division}</span>
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium">Phone:</span>
                              <span className="ml-1">{student.phoneNumber}</span>
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No students found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try searching with a different term
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Start typing to search for students</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
