
interface TextMessageProps {
  messageObject: MessageObject;
  myUserName: string;
}

export interface MessageObject{
  id :number;
  message: string;
  time :any;
  userName: string;
  roomName:string;
}


export default function TextMessage({ messageObject, myUserName }: TextMessageProps) {
    
  // Checking against the messageObject.username to match the user
  const isMyMessage = messageObject.userName === myUserName;
  console.log(myUserName);
  const textMessage = messageObject.message;
  const time = messageObject.time;
  
  return (
    <div>
        
      {isMyMessage ? (
        <div className="flex flex-col">
            
          <div className="flex justify-end mt-2">
            <div className="max-w-[45%] w-max bg-[#1A66FF] px-3 py-1.5 rounded-l-xl rounded-tr-xl overflow-wrap break-words">
              <div className="flex flex-col">
                <div className="text-lg text-white px-2 py-1.5">{textMessage}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs pt-1 text-slate-300 flex justify-end">
              {time}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-start mt-2">
            <div className="max-w-[45%] w-max bg-[#1B1B1B] px-3 py-1.5 rounded-r-xl rounded-tl-xl overflow-wrap break-words">
              <div className="flex flex-col">
                <div className="text-lg text-white px-2 py-1.5">{textMessage}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs pt-1 text-slate-300 flex flex-col items-start justify-start">
              <div>{time}</div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
