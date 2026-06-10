import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";

const emptyProfileForm = {
  name: "",
  email: "",
  bio: "",
  university: "",
  yearOfPassing: "",
  contact: "",
};

const emptyPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const UserProfilePage = () => {
  const { user } = useAuth();
  const [profileForm, setProfileForm] = useState(emptyProfileForm);
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoadingProfile(false);
        return;
      }

      try {
        setLoadingProfile(true);
        setProfileError("");

        const { data } = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        setProfileForm({
          name: data.name ?? "",
          email: data.email ?? "",
          bio: data.bio ?? "",
          university: data.university ?? "",
          yearOfPassing: data.yearOfPassing ? String(data.yearOfPassing) : "",
          contact: data.contact ?? "",
        });
        setRole(data.role ?? "");
      } catch (error) {
        console.error(error);
        setProfileError("Unable to load your profile right now.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileChange = (event) => {
    setProfileForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setPasswordForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileError("");
    setProfileSuccess("");

    try {
      setSavingProfile(true);

      const { data } = await axios.put(
        "/api/user/profile",
        {
          name: profileForm.name,
          bio: profileForm.bio,
          university: profileForm.university,
          yearOfPassing: profileForm.yearOfPassing.trim(),
          contact: profileForm.contact,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setProfileForm((current) => ({
        ...current,
        name: data.user.name ?? "",
        bio: data.user.bio ?? "",
        university: data.user.university ?? "",
        yearOfPassing: data.user.yearOfPassing
          ? String(data.user.yearOfPassing)
          : "",
        contact: data.user.contact ?? "",
      }));
      setProfileSuccess(data.message || "Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setProfileError(
        error.response?.data?.message || "Unable to update profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password must match.");
      return;
    }

    try {
      setUpdatingPassword(true);

      const { data } = await axios.put(
        "/api/user/profile/password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      setPasswordForm(emptyPasswordForm);
      setPasswordSuccess(data.message || "Password updated successfully.");
    } catch (error) {
      console.error(error);
      setPasswordError(
        error.response?.data?.message || "Unable to update password.",
      );
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleBecomeInstructor = async () => {
    try {
      const response = await axios.patch(
        "/api/user/become-instructor",
        {},
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      );

      localStorage.setItem("user", JSON.stringify(response.data.token));

      alert("You are now an instructor!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to become instructor");
    }
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="mb-4">
              <h1 className="fw-bold mb-2">Account Settings</h1>
              <p className="text-muted mb-0">
                Update your personal details and keep your password secure.
              </p>
            </div>

            {loadingProfile ? (
              <div className="alert alert-light border shadow-sm text-center">
                Loading your profile...
              </div>
            ) : (
              <div className="row g-4">
                <div className="col-12 col-lg-7">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                        <div>
                          <h2 className="h4 mb-1">Profile Details</h2>
                          <p className="text-muted mb-0">
                            These details will help personalize the learning
                            experience.
                          </p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          {role && (
                            <span className="badge text-bg-dark text-uppercase">
                              {role}
                            </span>
                          )}

                          {role === "student" && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={handleBecomeInstructor}
                            >
                              Become Instructor
                            </button>
                          )}
                        </div>
                      </div>

                      {profileError && (
                        <div className="alert alert-danger py-2">
                          {profileError}
                        </div>
                      )}
                      {profileSuccess && (
                        <div className="alert alert-success py-2">
                          {profileSuccess}
                        </div>
                      )}

                      <form onSubmit={handleProfileSubmit}>
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={profileForm.name}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={profileForm.email}
                              disabled
                              readOnly
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label">Bio</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              name="bio"
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                              placeholder="Tell us a little about yourself"
                            />
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">University</label>
                            <input
                              type="text"
                              className="form-control"
                              name="university"
                              value={profileForm.university}
                              onChange={handleProfileChange}
                              placeholder="Your university name"
                            />
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Year of Passing
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="yearOfPassing"
                              value={profileForm.yearOfPassing}
                              onChange={handleProfileChange}
                              placeholder="2026"
                              min="1900"
                              max="3000"
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label">Contact</label>
                            <input
                              type="tel"
                              className="form-control"
                              name="contact"
                              value={profileForm.contact}
                              onChange={handleProfileChange}
                              placeholder="Phone number or preferred contact"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={savingProfile}
                        >
                          {savingProfile ? "Saving..." : "Save Profile"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <h2 className="h4 mb-1">Change Password</h2>
                      <p className="text-muted mb-4">
                        Use your current password to set a new one.
                      </p>

                      {passwordError && (
                        <div className="alert alert-danger py-2">
                          {passwordError}
                        </div>
                      )}
                      {passwordSuccess && (
                        <div className="alert alert-success py-2">
                          {passwordSuccess}
                        </div>
                      )}

                      <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            minLength="6"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            minLength="6"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-outline-dark w-100"
                          disabled={updatingPassword}
                        >
                          {updatingPassword ? "Updating..." : "Update Password"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
