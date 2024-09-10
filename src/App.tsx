import {
  AuthProvider,
  FeatureFlagProvider,
  NotificationProvider,
  QueryProvider,
  RouteProvider,
} from "./providers";

export default function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <FeatureFlagProvider>
          <NotificationProvider>
            <RouteProvider />
          </NotificationProvider>
        </FeatureFlagProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
