export function ReplyList({ replies, render }) {
  return (
    <div className="relative mt-6 flex w-full flex-col gap-8 self-end pl-12">
      <div className="absolute -top-14 left-6  h-[100%] w-[1px] bg-gray-300/80"></div>
      {replies.map(render)}
    </div>
  );
}
