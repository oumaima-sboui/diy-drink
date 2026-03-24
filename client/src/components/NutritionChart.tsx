import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Ingredient } from '@/lib/types';
import { calculateNutrition } from '@/lib/nutrition';

// Enregistrer les composants Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface NutritionChartProps {
  ingredients: Ingredient[];
}

export default function NutritionChart({ ingredients }: NutritionChartProps) {
  const { macros, vitamins, minerals } = calculateNutrition(ingredients);
  // Données pour le graphique en donut des macronutriments
  const macrosData = {
    labels: ['Protéines', 'Glucides', 'Lipides', 'Fibres'],
    datasets: [
      {
        label: 'Macronutriments (g)',
        data: [macros.protein, macros.carbs, macros.fat, macros.fiber],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  // Rouge pour protéines
          'rgba(54, 162, 235, 0.8)',  // Bleu pour glucides
          'rgba(255, 206, 86, 0.8)',  // Jaune pour lipides
          'rgba(75, 192, 192, 0.8)',  // Vert pour fibres
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const macrosOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 11,
          },
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}g`;
          }
        }
      }
    },
  };

  // Données pour le graphique en barres des vitamines
  const vitaminsData = {
    labels: vitamins.slice(0, 5).map(v => v.name.replace('Vitamine ', 'Vit. ')),
    datasets: [
      {
        label: 'Quantité',
        data: vitamins.slice(0, 5).map(v => v.amount),
        backgroundColor: 'rgba(124, 179, 66, 0.8)',
        borderColor: 'rgba(124, 179, 66, 1)',
        borderWidth: 2,
      },
    ],
  };

  const vitaminsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const vitamin = vitamins[context.dataIndex];
            return `${vitamin.amount}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      }
    },
  };

  // Données pour le graphique en barres des minéraux
  const mineralsData = {
    labels: minerals.slice(0, 4).map(m => m.name),
    datasets: [
      {
        label: 'Quantité (mg)',
        data: minerals.slice(0, 4).map(m => m.amount),
        backgroundColor: 'rgba(255, 111, 0, 0.8)',
        borderColor: 'rgba(255, 111, 0, 1)',
        borderWidth: 2,
      },
    ],
  };

  const mineralsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const mineral = minerals[context.dataIndex];
            return `${mineral.amount}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      }
    },
  };

  return (
    <div className="space-y-6">
      {/* Graphique Macronutriments */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-center">Répartition des Macronutriments</h4>
        <div className="h-48">
          <Doughnut data={macrosData} options={macrosOptions} />
        </div>
      </div>

      {/* Graphique Vitamines */}
      {vitamins.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-center">Vitamines Principales</h4>
          <div className="h-40">
            <Bar data={vitaminsData} options={vitaminsOptions} />
          </div>
        </div>
      )}

      {/* Graphique Minéraux */}
      {minerals.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-center">Minéraux Principaux</h4>
          <div className="h-40">
            <Bar data={mineralsData} options={mineralsOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
