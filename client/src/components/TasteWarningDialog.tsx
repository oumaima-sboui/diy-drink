import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { TasteWarning } from '@/lib/tasteWarnings';

interface TasteWarningDialogProps {
  open: boolean;
  warnings: TasteWarning[];
  onContinue: () => void;
  onGoBack: () => void;
  onRemoveIngredient?: (ingredientName: string) => void;
}

export default function TasteWarningDialog({ 
  open, 
  warnings, 
  onContinue, 
  onGoBack,
  onRemoveIngredient
}: TasteWarningDialogProps) {
  const { t } = useTranslation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            {t('taste.warning.title')}
          </DialogTitle>
          <DialogDescription>
            {t('taste.warning.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {warnings.map((warning, index) => (
            <Alert 
              key={index} 
              className={`${getSeverityColor(warning.severity)} border-2`}
            >
              <AlertDescription className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{warning.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">
                      {t(warning.titleKey)}
                    </p>
                    <p className="text-gray-700 mt-1">
                      {t(warning.descriptionKey)}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-600">
                        {t('taste.warning.concernedIngredients')}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {warning.ingredients.map((ing, i) => (
                          <div 
                            key={i}
                            className="group relative px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 border hover:border-red-500 transition-all"
                          >
                            <span>{ing}</span>
                            {onRemoveIngredient && (
                              <button
                                onClick={() => onRemoveIngredient(ing)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                title={`${t('taste.warning.remove')} ${ing}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {warning.suggestionKey && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        💡 {t(warning.suggestionKey)}
                      </p>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ </strong>{t('taste.warning.tip')}
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={onGoBack}
            className="flex-1 w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('taste.warning.modifyOrder')}
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 w-full bg-[#FF6F00] hover:bg-[#E65100] text-white"
          >
            {t('taste.warning.continuePayment')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}