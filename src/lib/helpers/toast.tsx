"use client"

import { toast as baseToast, type ToasterProps } from "sonner"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { ReactNode } from "react"

type ToastContent = {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Custom toast with icons and better styling
 */
export const toast = Object.assign(
  (options: ToastContent & ToasterProps) =>
    baseToast(options.title, {
      description: options.description,
      action: options.action,
      closeButton: true,
      ...options,
    }),
  {
    success: (options: ToastContent & ToasterProps) =>
      baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-emerald-900">{options.title}</p>
              {options.description && (
                <p className="text-sm text-emerald-700 mt-1">{options.description}</p>
              )}
              {options.action && (
                <button
                  onClick={() => {
                    options.action!.onClick()
                    baseToast.dismiss(t)
                  }}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-2 underline"
                >
                  {options.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => baseToast.dismiss(t)}
              className="text-emerald-400 hover:text-emerald-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 4000,
          ...options,
        }
      ),

    error: (options: ToastContent & ToasterProps) =>
      baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-red-50 border border-red-200 rounded-lg shadow-md">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-red-900">{options.title}</p>
              {options.description && (
                <p className="text-sm text-red-700 mt-1">{options.description}</p>
              )}
              {options.action && (
                <button
                  onClick={() => {
                    options.action!.onClick()
                    baseToast.dismiss(t)
                  }}
                  className="text-sm font-medium text-red-600 hover:text-red-700 mt-2 underline"
                >
                  {options.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => baseToast.dismiss(t)}
              className="text-red-400 hover:text-red-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 5000,
          ...options,
        }
      ),

    warning: (options: ToastContent & ToasterProps) =>
      baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg shadow-md">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-amber-900">{options.title}</p>
              {options.description && (
                <p className="text-sm text-amber-700 mt-1">{options.description}</p>
              )}
              {options.action && (
                <button
                  onClick={() => {
                    options.action!.onClick()
                    baseToast.dismiss(t)
                  }}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 mt-2 underline"
                >
                  {options.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => baseToast.dismiss(t)}
              className="text-amber-400 hover:text-amber-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 4000,
          ...options,
        }
      ),

    info: (options: ToastContent & ToasterProps) =>
      baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-blue-900">{options.title}</p>
              {options.description && (
                <p className="text-sm text-blue-700 mt-1">{options.description}</p>
              )}
              {options.action && (
                <button
                  onClick={() => {
                    options.action!.onClick()
                    baseToast.dismiss(t)
                  }}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 underline"
                >
                  {options.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => baseToast.dismiss(t)}
              className="text-blue-400 hover:text-blue-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 4000,
          ...options,
        }
      ),

    loading: (options: ToastContent & ToasterProps) =>
      baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg shadow-md">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
              <div className="animate-spin rounded-full h-full w-full border-2 border-slate-300 border-t-slate-600"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">{options.title}</p>
              {options.description && (
                <p className="text-sm text-slate-600 mt-1">{options.description}</p>
              )}
            </div>
          </div>
        ),
        {
          duration: Infinity,
          closeButton: false,
          ...options,
        }
      ),

    promise: <T,>(
      promise: Promise<T>,
      messages: {
        loading: ToastContent
        success: ToastContent
        error: ToastContent
      }
    ) => {
      const toastId = baseToast.custom(
        (t) => (
          <div className="flex items-start gap-3 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg shadow-md">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
              <div className="animate-spin rounded-full h-full w-full border-2 border-slate-300 border-t-slate-600"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">{messages.loading.title}</p>
              {messages.loading.description && (
                <p className="text-sm text-slate-600 mt-1">{messages.loading.description}</p>
              )}
            </div>
          </div>
        ),
        {
          duration: Infinity,
          closeButton: false,
        }
      )

      promise
        .then(() => {
          baseToast.dismiss(toastId)
          toast.success(messages.success)
        })
        .catch(() => {
          baseToast.dismiss(toastId)
          toast.error(messages.error)
        })

      return toastId
    },
  }
)