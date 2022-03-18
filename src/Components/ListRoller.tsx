import React, { useEffect, useState } from "react";

interface IListRollerProps {
  items: string[];
}

interface IListRollerState {
  visibleItems: string[];
  exchangeItems: string[];
}

export const ListRoller = (props: IListRollerProps) => {
  const [classList, setClassList] = useState<string[]>(["item1", "item2", "item3","item4","item5",]);
  const [state, setState] = useState<IListRollerState>();
  const [cancellationToken, setCancellationToken] = useState<NodeJS.Timeout>();

  useStateUpdateOnPropsChange(props.items, setState, cancellationToken);

  useShiftItemsOnInterval(
    setState,
    setClassList
  );

  return (
    <ul>
      {state?.visibleItems.map((item, index) => (
        <li key={index} className={classList[index]}>{item}</li>
      ))}
    </ul>
  );
};

function useStateUpdateOnPropsChange(
  items: IListRollerProps["items"],
  setState: React.Dispatch<React.SetStateAction<IListRollerState | undefined>>,
  cancellationToken: NodeJS.Timeout | undefined
) {
  useEffect(() => {
    if (cancellationToken !== undefined) clearTimeout(cancellationToken);

    setState((prevState) => {
      if (prevState === undefined)
        return {
          visibleItems: items,
          exchangeItems: [],
        };

      return {
        visibleItems: prevState.visibleItems,
        exchangeItems: items,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
}

function useShiftItemsOnInterval(
  setState: React.Dispatch<React.SetStateAction<IListRollerState | undefined>>,
  setClassList: React.Dispatch<React.SetStateAction<string[]>>
) {
  useEffect(() => {
    const cancellationToken = setInterval(() => {
      setState((prevState) => {
        if (prevState === undefined) return;

        const { visibleItems, exchangeItems } = prevState;
        const tempVisible = [...visibleItems];
        let tempExchange = [...exchangeItems];

        let swapItem = tempVisible.shift() as string;

        if (exchangeItems.length > 0) {
          swapItem = tempExchange.shift() as string;
        }

        return {
          visibleItems: [...tempVisible, swapItem],
          exchangeItems: tempExchange,
        };
      });

      setClassList((prevClassList) => {
        const tempClassList = [...prevClassList];
        let swapItem = tempClassList.shift() as string;
        return [...tempClassList, swapItem]
      });
    }, 1000);

    return () => clearInterval(cancellationToken);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
