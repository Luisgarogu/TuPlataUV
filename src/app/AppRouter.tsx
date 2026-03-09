import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { GoogleAccountPickerPage } from '../pages/GoogleAccountPickerPage';
import { IncomeOnboardingPage } from '../pages/IncomeOnboardingPage';
import { ExpenseOnboardingPage } from '../pages/ExpenseOnboardingPage';

import { MovementsPage } from '../pages/MovementsPage';
import { IncomeFormPage } from '../pages/IncomeFormPage';
import { ExpenseFormPage } from '../pages/ExpenseFormPage';
import { BudgetsPage } from '../pages/BudgetsPage';
import { BudgetFormPage } from '../pages/BudgetFormPage';
import { RemindersPage } from '../pages/RemindersPage';
import { ReminderFormPage } from '../pages/ReminderFormPage';
import { HelpPage } from '../pages/HelpPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const Protected = ({ children }: { children: React.ReactElement }) => {
  const { session } = useApp();
  return session ? children : <Navigate to="/login" replace />;
};

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/login/google" element={<GoogleAccountPickerPage />} />
    <Route path="/onboarding/income" element={<IncomeOnboardingPage />} />
    <Route path="/onboarding/expense" element={<ExpenseOnboardingPage />} />

    <Route
      path="/dashboard"
      element={
        <Protected>
          <DashboardPage />
        </Protected>
      }
    />
    <Route
      path="/movements"
      element={
        <Protected>
          <MovementsPage />
        </Protected>
      }
    />
    <Route
      path="/income/new"
      element={
        <Protected>
          <IncomeFormPage />
        </Protected>
      }
    />
    <Route
      path="/expense/new"
      element={
        <Protected>
          <ExpenseFormPage />
        </Protected>
      }
    />
    <Route
      path="/budgets"
      element={
        <Protected>
          <BudgetsPage />
        </Protected>
      }
    />
    <Route
      path="/budgets/new"
      element={
        <Protected>
          <BudgetFormPage />
        </Protected>
      }
    />
    <Route
      path="/reminders"
      element={
        <Protected>
          <RemindersPage />
        </Protected>
      }
    />
    <Route
      path="/reminders/new"
      element={
        <Protected>
          <ReminderFormPage />
        </Protected>
      }
    />
    <Route
      path="/help"
      element={
        <Protected>
          <HelpPage />
        </Protected>
      }
    />
    <Route
      path="/settings"
      element={
        <Protected>
          <SettingsPage />
        </Protected>
      }
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);