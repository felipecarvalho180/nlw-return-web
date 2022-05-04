import { ArrowLeft } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

const placeholderByType = {
  BUG: "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
  IDEA: "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
  OTHER: "Queremos te ouvir. O que você gostaria de nos dizer? ",
};

export const FeedbackContentStep: React.FC<FeedbackContentStepProps> = ({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent,
}) => {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      screenshot,
      comment,
    });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          onClick={onRestartFeedback}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="h-6 w-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder={placeholderByType[feedbackType]}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
};
