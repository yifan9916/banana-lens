import { type ReactionKey, reactionMap } from './data';

export type Reaction = ReactionKey;

export const Reactions = (props: { reactions: Reaction[] }) => {
  const { reactions } = props;

  return (
    <>
      <button
        className="peer"
        tabIndex={0} /* tabIndex is not set by default in safari */
      >
        <ul className="cursor-pointer absolute flex flex-wrap justify-center border rounded-full bg-white dark:bg-black py-1 px-2 gap-2 -bottom-4 right-2">
          {reactions.map((r) => {
            const reaction = reactionMap[r];
            const Icon = reaction.icon;

            return (
              <li title={reaction.label} key={r}>
                <Icon className="h-4 w-4" />
              </li>
            );
          })}
        </ul>
      </button>

      <div className="hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-96 pt-6 pb-24 sm:pb-0 border border-b-0 rounded-t-3xl bg-white dark:bg-black z-40 peer-focus:flex justify-center items-center">
        <ul className="grid grid-cols-2 gap-6 p-4">
          {reactions.map((r) => {
            const reaction = reactionMap[r];
            const Icon = reaction.icon;

            return (
              <li key={r} className="flex flex-row items-center">
                <Icon className="h-8 w-8 mr-4" />
                <span>{reaction.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
