import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudentById } from '../store/slices/studentSlice';
import { loadPaymentsByStudentId } from '../store/slices/paymentSlice';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Users,
  DollarSign,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { format } from 'date-fns';

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedStudent } = useSelector((state) => state.students);
  const { studentPayments } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(loadStudentById(studentId));
    dispatch(loadPaymentsByStudentId(studentId));
  }, [dispatch, studentId]);

  if (!selectedStudent) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Student not found</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const feePercentage = Math.round(
    (selectedStudent.feesPaid / selectedStudent.totalFees) * 100
  );

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3">
      <div className="bg-primary-50 p-2 rounded-lg mt-0.5">
        <Icon className="h-4 w-4 text-primary-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-0.5">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
              {selectedStudent.fullName}
            </h1>
            <p className="text-gray-600">
              {selectedStudent.grNumber} • {selectedStudent.class} - {selectedStudent.division}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedStudent.feeStatus === 'Paid'
                ? 'bg-success-100 text-success-700'
                : selectedStudent.feeStatus === 'Partial'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-danger-100 text-danger-700'
            }`}
          >
            {selectedStudent.feeStatus}
          </span>
        </div>

        {/* Fee Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Fee Payment Progress</span>
            <span className="font-medium text-gray-900">{feePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                feePercentage === 100
                  ? 'bg-success-600'
                  : feePercentage > 50
                  ? 'bg-warning-500'
                  : 'bg-danger-500'
              }`}
              style={{ width: `${feePercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">
              Paid: {formatCurrency(selectedStudent.feesPaid)}
            </span>
            <span className="text-gray-600">
              Total: {formatCurrency(selectedStudent.totalFees)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary-600" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <InfoItem
              icon={User}
              label="Full Name"
              value={selectedStudent.fullName}
            />
            <InfoItem
              icon={Mail}
              label="Email"
              value={selectedStudent.email}
            />
            <InfoItem
              icon={Phone}
              label="Phone Number"
              value={selectedStudent.phoneNumber}
            />
            <InfoItem
              icon={MapPin}
              label="Address"
              value={`${selectedStudent.address.street}, ${selectedStudent.address.city}, ${selectedStudent.address.state} - ${selectedStudent.address.pincode}`}
            />
            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Caste</p>
                <p className="text-gray-900 font-medium">{selectedStudent.caste}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mother Tongue</p>
                <p className="text-gray-900 font-medium">{selectedStudent.motherTongue}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Family Income</p>
              <p className="text-gray-900 font-medium">
                {formatCurrency(selectedStudent.familyIncome)} / year
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Aadhaar Number</p>
              <p className="text-gray-900 font-medium">{selectedStudent.aadhaarNumber}</p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-primary-600" />
            Academic Information
          </h2>
          <div className="space-y-4">
            <InfoItem
              icon={GraduationCap}
              label="Student ID"
              value={selectedStudent.studentId}
            />
            <InfoItem
              icon={GraduationCap}
              label="GR Number"
              value={selectedStudent.grNumber}
            />
            <InfoItem
              icon={GraduationCap}
              label="Class & Division"
              value={`${selectedStudent.class} - Division ${selectedStudent.division}`}
            />
            <InfoItem
              icon={Calendar}
              label="Admission Year"
              value={selectedStudent.admissionYear}
            />
          </div>

          {/* Guardian Details */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-display font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Guardian Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Father's Name</p>
                <p className="text-gray-900 font-medium">
                  {selectedStudent.guardianDetails.fatherName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mother's Name</p>
                <p className="text-gray-900 font-medium">
                  {selectedStudent.guardianDetails.motherName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Guardian Phone</p>
                <p className="text-gray-900 font-medium">
                  {selectedStudent.guardianDetails.guardianPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
          Payment History
        </h2>

        {studentPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Payment ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Mode
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Transaction Ref
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                      {payment.paymentId}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {format(new Date(payment.paymentDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
                        {payment.paymentMode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">
                      {payment.transactionRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No payment history available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
