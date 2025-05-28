import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import PropTypes from "prop-types";

const LogoutButton = ({ className }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className={className || "text-red-600 hover:text-red-800 font-medium"}
    >
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
