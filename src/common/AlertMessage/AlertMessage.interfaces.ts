interface IAlertMessageProps {
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
  message?: string;
}

export type { IAlertMessageProps };
