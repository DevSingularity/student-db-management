import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeframe } from '../store/slices/paymentSlice';
import { getPaymentsByTimeframe } from '../data/mockData';
import { Calendar, List, DollarSign, TrendingUp, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';

const PaymentDashboard = () => {
  const dispatch = useDispatch();
  const { selectedTimeframe } = useSelector((state) => state.payments);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const filteredPayments = getPaymentsByTimeframe(selectedTimeframe);
    setPayments(filteredPayments);
  }, [selectedTimeframe]);

  const handleTimeframeChange = (timeframe) => {
    dispatch(setTimeframe(timeframe));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  // Calendar View Logic
  const currentDate = new Date('2026-02-09');
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPaymentsForDate = (date) => {
    return payments.filter((payment) =>
      isSameDay(parseISO(payment.paymentDate), date)
    );
  };

  const getDayAmount = (date) => {
    const dayPayments = getPaymentsForDate(date);
    return dayPayments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Payment Dashboard
          </h1>
          <p className="text-gray-600">Track and analyze fee collections</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="h-4 w-4" />
            <span className="text-sm font-medium">List</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'calendar'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Calendar</span>
          </button>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-900">Timeframe</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['daily', 'weekly', 'monthly'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => handleTimeframeChange(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTimeframe === timeframe
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm mb-2">
              Total Collection ({selectedTimeframe})
            </p>
            <p className="text-4xl font-display font-bold">{formatCurrency(totalAmount)}</p>
            <p className="text-primary-100 text-sm mt-2">
              {payments.length} transaction{payments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl">
            <TrendingUp className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-display font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {daysInMonth.map((day) => {
              const dayPayments = getPaymentsForDate(day);
              const dayAmount = getDayAmount(day);
              const hasPayments = dayPayments.length > 0;
              const isToday = isSameDay(day, currentDate);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(hasPayments ? day : null)}
                  className={`aspect-square p-2 rounded-lg border transition-all ${
                    isToday
                      ? 'border-primary-600 bg-primary-50'
                      : hasPayments
                      ? 'border-success-300 bg-success-50 hover:bg-success-100'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  disabled={!hasPayments}
                >
                  <div className="flex flex-col h-full">
                    <span
                      className={`text-sm font-medium ${
                        isToday
                          ? 'text-primary-600'
                          : hasPayments
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>
                    {hasPayments && (
                      <div className="mt-auto">
                        <p className="text-xs font-semibold text-success-700">
                          {dayPayments.length}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          ₹{(dayAmount / 1000).toFixed(0)}k
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Payments on {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <div className="space-y-2">
                {getPaymentsForDate(selectedDate).map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{payment.studentName}</p>
                      <p className="text-sm text-gray-600">{payment.paymentMode}</p>
                    </div>
                    <p className="font-semibold text-success-600">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-display font-semibold text-gray-900">
              All Transactions
            </h2>
          </div>

          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Payment ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Mode
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Transaction Ref
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {format(parseISO(payment.paymentDate), 'MMM dd, yyyy')}
                        <br />
                        <span className="text-xs text-gray-500">
                          {format(parseISO(payment.paymentDate), 'hh:mm a')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {payment.studentName}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-mono">
                        {payment.paymentId}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 font-bold">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            payment.paymentMode === 'UPI'
                              ? 'bg-primary-100 text-primary-700'
                              : payment.paymentMode === 'Cash'
                              ? 'bg-success-100 text-success-700'
                              : payment.paymentMode === 'Card'
                              ? 'bg-warning-100 text-warning-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {payment.paymentMode}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-mono">
                        {payment.transactionRef}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No payments found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try selecting a different timeframe
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
