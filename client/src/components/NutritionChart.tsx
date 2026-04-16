import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface NutritionChartProps {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  vitamins: {
    C: number;
    A: number;
    K: number;
  };
}

export default function NutritionChart({ calories, proteins, carbs, fats, fiber, vitamins }: NutritionChartProps) {
  const doughnutRef = useRef<any>(null);
  const barRef = useRef<any>(null);

  // Force re-render des charts
  useEffect(() => {
    if (doughnutRef.current) {
      doughnutRef.current.update();
    }
    if (barRef.current) {
      barRef.current.update();
    }
  }, [calories, proteins, carbs, fats, fiber, vitamins]);

  const macroData = {
    labels: ['Protéines', 'Glucides', 'Lipides'],
    datasets: [
      {
        data: [proteins, carbs, fats],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const vitaminData = {
    labels: ['Vitamine C', 'Vitamine A', 'Vitamine K', 'Fibres'],
    datasets: [
      {
        label: '% Apports Journaliers',
        data: [vitamins.C, vitamins.A, vitamins.K, fiber],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Macronutriments - Doughnut */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-[#004D40] mb-4 text-center">
          Macronutriments
        </h3>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[250px] h-[250px] flex items-center justify-center">
            {(proteins > 0 || carbs > 0 || fats > 0) ? (
              <Doughnut 
                ref={doughnutRef}
                data={macroData} 
                options={chartOptions}
              />
            ) : (
              <p className="text-gray-400 text-sm text-center">
                Aucune donnée de macronutriments
              </p>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-[#FF6F00]">
              {calories} kcal
            </p>
            <p className="text-sm text-gray-500">Calories totales</p>
          </div>
        </div>
      </div>

      {/* Vitamines & Fibres - Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-[#004D40] mb-4 text-center">
          Vitamines & Fibres
        </h3>
        <div className="w-full h-[250px] flex items-center justify-center">
          {(vitamins.C > 0 || vitamins.A > 0 || vitamins.K > 0 || fiber > 0) ? (
            <Bar 
              ref={barRef}
              data={vitaminData} 
              options={barOptions}
            />
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Aucune donnée de vitamines
            </p>
          )}
        </div>
      </div>
    </div>
  );
}