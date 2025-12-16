import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'

export function LanguageSelector({ onSelectLanguage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-2xl p-4 shadow-md border border-red-200">
              <span className="text-6xl">🌡️</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            حاسبة الحرارة
          </CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
            Fever Calculator
          </CardTitle>
          <CardDescription className="text-lg">
            اختر لغتك / Choose Your Language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => onSelectLanguage('ar')}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
          >
            <span className="text-2xl mr-3">🇸🇦</span>
            العربية
          </Button>
          <Button
            onClick={() => onSelectLanguage('en')}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
          >
            <span className="text-2xl mr-3">🇬🇧</span>
            English
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

