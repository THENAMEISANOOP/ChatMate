import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 overflow-hidden">
      {/* Profile Box */}
      <div className="w-full max-w-md p-4 bg-base-300 rounded-xl space-y-4 max-h-[90vh] overflow-hidden">
        <div className="text-center space-y-1">
          <h1 className="text-lg font-semibold">Profile</h1>
          <p className="text-xs text-zinc-400">Your profile info</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
                p-1 rounded-full cursor-pointer transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-3 h-3 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-[10px] text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Tap camera icon to change"}
          </p>
        </div>

        {/* User Info */}
        <div className="space-y-2 text-sm">
          <div>
            <div className="flex items-center gap-1 text-zinc-400 text-xs">
              <User className="w-3 h-3" />
              Full Name
            </div>
            <p className="px-3 py-1.5 bg-base-200 rounded-lg border mt-1 text-sm">
              {authUser?.fullName}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-zinc-400 text-xs">
              <Mail className="w-3 h-3" />
              Email
            </div>
            <p className="px-3 py-1.5 bg-base-200 rounded-lg border mt-1 text-sm">
              {authUser?.email}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-base-300 rounded-xl p-3 text-sm border mt-1">
          <h2 className="text-sm font-medium mb-2">Account Info</h2>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between border-b border-zinc-700 pb-1">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
