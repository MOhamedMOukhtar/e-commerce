import { PasswordChecks } from "@/types/passwordValidation";
import React from "react";

interface PrposPassword {
  passwordChecks: PasswordChecks;
  check: boolean;
}

function PasswordCheck({ passwordChecks, check }: PrposPassword) {
  return (
    <div className="mt-4 rounded-md border bg-gray-50 p-4">
      <h1>Your password must contain</h1>
      <ul
        className={`mt-2 space-y-1 pl-4 text-sm ${check ? "text-red-400" : "text-gray-400"}`}
      >
        <li className={passwordChecks.minLength ? "text-green-400" : ""}>
          8-20 characters
        </li>
        <li className={passwordChecks.hasLower ? "text-green-400" : ""}>
          At least one lowercase letter
        </li>
        <li className={passwordChecks.hasUpper ? "text-green-400" : ""}>
          At least one uppercase letter
        </li>
        <li className={passwordChecks.hasNumber ? "text-green-400" : ""}>
          At least one number
        </li>
        <li className={passwordChecks.hasSpecial ? "text-green-400" : ""}>
          At least one special character
        </li>
      </ul>
    </div>
  );
}

export default PasswordCheck;
