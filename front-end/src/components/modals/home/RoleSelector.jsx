import React from "react";
import './RoleSelector.css'

/**
 * RoleSelector
 * Modal shown when a visitor clicks "Get Started" on the Jobsphere
 * homepage. Lets them choose whether they're joining as a Service
 * job_seeker or as a employer.
 *
 * This component only handles presentation. Wiring it up (opening
 * it from the "Get Started" button, and what happens after a role
 * is picked) is handled by the parent.
 *
 * Props:
 * - isOpen: boolean — whether the modal is visible
 * - onClose: () => void — called when the modal should close
 *   (backdrop click or close button)
 * - onSelectRole: (role: "job_seeker" | "employer") => void — called
 *   when a card is clicked
 */
function RoleSelector({ isOpen, onClose, onSelectRole }) {
  if (!isOpen) return null;

  return (
    <div
      className="jobsphere-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="jobsphere-modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="jobsphere-role-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="jobsphere-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="jobsphere-modal-header">
          <p className="jobsphere-eyebrow">Get started</p>
          <h2 id="jobsphere-role-title" className="jobsphere-modal-title">
            How will you use JobSphere?
          </h2>
          <p className="jobsphere-modal-sub">
            Choose the option that fits you best — you can always change
            this later.
          </p>
        </div>

        <div className="jobsphere-role-grid">
          <button
            type="button"
            className="jobsphere-role-card"
            onClick={() => onSelectRole("jobseeker")}
          >
            <div className="jobsphere-role-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.7 6.3a4 4 0 1 1-5.66 5.66L4 17v3h3l5.04-5.04A4 4 0 0 1 17.7 9.3l-1-1-2 2-2-2 2-2-1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="jobsphere-role-title">I'm a Job Seeker</h3>
            <p className="jobsphere-role-text">
              Find jobs, apply with your CV, build your profile, and use AI to check your job fit.
            </p>
            <span className="jobsphere-role-cta">Continue as a Job Seeker →</span>
          </button>

          <button
            type="button"
            className="jobsphere-role-card"
            onClick={() => onSelectRole("employer")}
          >
            <div className="jobsphere-role-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5M9.5 20v-5.5h5V20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="jobsphere-role-title">I'm an employer</h3>
            <p className="jobsphere-role-text">
              Post and manage jobs, track applications, and connect with qualified candidates.
            </p>
            <span className="jobsphere-role-cta">Continue as employer →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;