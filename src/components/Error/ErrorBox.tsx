import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "..";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface ErrorMessageProps {
  error: string;
  message: string;
}

export const ErrorBox = ({ error, message }: ErrorMessageProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [viewMoreActive, setViewMoreActive] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);

  function calculateNumberOfLines(
    text: string,
    containerWidth: number,
    fontSize: number
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("Canvas context is not supported");
      return 0;
    }

    context.font = `${fontSize}px sans-serif`;
    const words = text.split(" ");

    let currentLine = "";
    let numberOfLines = 1;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + " ";
      const { width } = context.measureText(testLine);

      if (width > containerWidth) {
        currentLine = words[i] + " ";
        numberOfLines++;
      } else {
        currentLine = testLine;
      }
    }

    return numberOfLines;
  }

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement) {
      const maxHeight = 2; // Assuming line-clamp-2

      if (
        calculateNumberOfLines(message, textElement.clientWidth, 16) > maxHeight
      ) {
        setIsTextOverflowing(true);
      } else {
        setIsTextOverflowing(false);
      }
    }
  }, [message, textRef]);

  return (
    <div className="flex flex-row border-2 border-error rounded-md p-4">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-error stroke-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <div className="flex-grow ml-3">
        <div className="text-lg font-bold text-error">{error}</div>
        <div
          ref={textRef}
          className={cn(
            "mt-2 text-base text-iconBlack",
            !viewMoreActive && "line-clamp-2"
          )}
        >
          {message}
        </div>
        {isTextOverflowing && (
          <div>
            <Button
              label={viewMoreActive ? "View Less" : "View More"}
              onClick={() => setViewMoreActive(!viewMoreActive)}
              size="tight"
              icon={viewMoreActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
              iconPosition="right"
            />
          </div>
        )}
      </div>
    </div>
  );
};
