import { useState, useEffect } from 'react';
import useQuizData from '@/hooks/useQuizData';

export default function QuizSettings() {
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const { createQuiz, categoryOptions } = useQuizData();
  const [selectedOptions, setSelectedOptions] = useState({
    categoryId: '',
    difficulty: '',
  });

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center w-full">
        <select
          id="categorySelect"
          className="border rounded-none sm:border-y sm:border-l sm:rounded-l-xl p-2 border-r-6"
          placeholder="Select category"
          value={selectedOptions.categoryId}
          onChange={(e) =>
            setSelectedOptions({
              ...selectedOptions,
              categoryId: e.target.value,
            })
          }
        >
          <option value="">Select category</option>
          {categoryOptions &&
            categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <select
          id="difficultySelect"
          className="border rounded-none p-2"
          placeholder="Select difficulty"
          value={selectedOptions.difficulty}
          onChange={(e) =>
            setSelectedOptions({
              ...selectedOptions,
              difficulty: e.target.value,
            })
          }
        >
          <option value="">Select difficulty</option>
          {difficultyOptions.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={() => createQuiz({ selectedOptions })}
          id="createBtn"
          className={`bg-blue-600 hover:bg-blue-500 p-2 px-4 sm:rounded-r-xl text-white`}
          disabled={!selectedOptions.categoryId || !selectedOptions.difficulty}
        >
          Create
        </button>
      </div>
    </>
  );
}
