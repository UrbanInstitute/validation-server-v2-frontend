import { format } from "date-fns-tz";
import { Button } from "..";
import { Link } from "react-router-dom";

export interface NotificationProps {
  text: string;
  timestamp: Date;
  onMarkClick: () => void;
  linkText?: string;
  linkLocation?: string;
}

export const Notification = ({
  text,
  timestamp,
  onMarkClick,
  linkText,
  linkLocation,
}: NotificationProps) => {
  const formattedText =
    linkText && linkLocation
      ? text.split(linkText).map((part, index, array) => (
          <>
            {part}
            {index < array.length - 1 && (
              <Link to={linkLocation} className="text-primary underline">
                {linkText}
              </Link>
            )}
          </>
        ))
      : text;

  return (
    <div className="grid grid-cols-12 w-full justify-between items-center text-base text-grayText py-3 px-3 border-2 border-grayBorder rounded-md">
      <div className="col-span-7">{formattedText}</div>
      <div className="ml-2 text-grayText text-sm col-span-3 text-right">
        [{format(timestamp, "MM-dd-yyyy 'at' h:mmaaa z")}]
      </div>
      <div className="col-span-2 flex flex-row justify-end">
        <Button
          buttonStyle="hover:scale-105 duration-200"
          label="Mark as Read"
          variant="filled"
          size="small"
          onClick={onMarkClick}
        />
      </div>
    </div>
  );
};
