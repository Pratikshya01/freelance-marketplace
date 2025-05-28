import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateOtp, resendOtp, clearError } from '../store/slices/authSlice';
import verificationImage from "../assets/images/email-verification.png";
import toast from 'react-hot-toast';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    let interval;
    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      // Move to previous input if current is empty
      if (index > 0 && !otp[index]) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      try {
        await dispatch(validateOtp({ email, otp: parseInt(otpString) })).unwrap();
        toast.success('Email verified successfully! Please login to continue.');
        navigate('/login');
      } catch (err) {
        // Error is handled by Redux and toast
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await dispatch(resendOtp({ email })).unwrap();
      toast.success('OTP resent successfully!');
      setTimer(60);
      setIsResendDisabled(true);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      // Error is handled by Redux and toast
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2">
        <img
          src={verificationImage}
          alt="Email verification illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-12">
            <h1 className="text-[#86D420] text-4xl font-bold mb-4">
              Verify your email
            </h1>
            <p className="text-gray-600 mb-2">
              We've sent a verification code to{' '}
              <span className="font-medium text-[#86D420]">{email}</span>
            </p>
            <p className="text-gray-600">
              Please check your email and enter the code below.
              <br />
              Be careful not to share the code with anyone.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#86D420] focus:outline-none bg-gray-50"
                />
              ))}
            </div>

            <div>
            <button
              type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#86D420] hover:bg-[#78bf1d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86D420] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            </div>

            <div className="text-center">
                <button
                  type="button"
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                className="text-sm text-[#86D420] hover:text-[#78bf1d] disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                {isResendDisabled
                  ? `Resend code in ${timer}s`
                  : 'Resend verification code'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
