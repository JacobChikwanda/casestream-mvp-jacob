"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2, XCircle, Mail, Building } from "lucide-react";

interface InvitationData {
  id: string;
  email: string;
  expiresAt: string;
  staffData?: any;
  account: {
    id: string;
    firmName: string;
    address?: any;
  };
  invitedBy: {
    id: string;
    name: string;
  };
}

export default function AcceptInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchInvitation();
  }, [token]);

  const fetchInvitation = async () => {
    try {
      const response = await fetch(`/api/invitations/${token}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setInvitation(data.invitation);

      // Pre-fill form with invitation data
      if (data.invitation.staffData) {
        setFormData(prev => ({
          ...prev,
          ...data.invitation.staffData,
          email: data.invitation.email,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          email: data.invitation.email,
        }));
      }
    } catch (err) {
      setError("Failed to load invitation");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setAccepting(true);
    setError(null);

    try {
      const response = await fetch(`/api/invitations/${token}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          // Include any additional staff data from the invitation
          ...invitation?.staffData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setAccepted(true);

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login?message=Account created successfully. Please log in.");
      }, 3000);
    } catch (err) {
      setError("Failed to accept invitation");
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p>Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <CardTitle className="text-red-700">Invalid Invitation</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <CardTitle className="text-green-700">Welcome Aboard!</CardTitle>
            <CardDescription>
              Your account has been created successfully. You will be redirected to the login page shortly.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <CardTitle>Join {invitation?.account.firmName}</CardTitle>
          <CardDescription>
            You've been invited to join the team. Complete your account setup below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {invitation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Building className="h-4 w-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">{invitation.account.firmName}</span>
              </div>
              <p className="text-sm text-blue-700">
                Invited by {invitation.invitedBy.name}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleAcceptInvitation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password (min 8 characters)"
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password *</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={accepting}
            >
              {accepting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating Account...
                </>
              ) : (
                "Accept Invitation & Create Account"
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By accepting this invitation, you agree to join {invitation?.account.firmName}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
