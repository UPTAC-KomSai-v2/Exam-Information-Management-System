"use client";

import notifStyles from "./notificationDropdown.module.css";

export default function NotificationDropdown() {
  return (
    <div className={notifStyles.notifDropdown}>
      <p className={notifStyles.notifHeader}>Notifications</p>

      <div className={notifStyles.notifItem}>• You have a new exam</div>
      <div className={notifStyles.notifItem}>• Announcement posted</div>
      <div className={notifStyles.notifItem}>• Your grade has been updated</div>
    </div>
  );
}
