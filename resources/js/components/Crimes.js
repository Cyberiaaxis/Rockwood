import React from "react";
import "../styles/Crimes.scss";

const Results = () => {
    return (
        <div>
            <p>Your resources are not enough or finished already</p>
        </div>
    );
};

const ListItem = ({ items, onShowResult }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = (event, items) => {
        event.preventDefault();
        if (items.children === undefined) {
            onShowResult();
        } else {
            setIsOpen((isOpen) => !isOpen);
        }
    };

    return (
        <React.Fragment>
            <li className="listItems">
                <a href={"#"} onClick={(e) => handleClick(e, items)}>
                    <label for="huey">{items.label}</label>
                    <input type="radio" value={items.label} /> {!!items.children}
                </a>
                {items.children && isOpen && (
                    <ul className="subList">
                        {items.children.map((child, idx) => (
                            <ListItem items={child} key={idx} onShowResult={onShowResult} />
                        ))}
                    </ul>
                )}
            </li>
        </React.Fragment>
    );
};

export default function Crimes() {
    const [showResult, setShowResult] = React.useState(false);
    const data = [
      {
          label: "Nerve 1",
          children: [
              {
                  label: "subNerve1",
                  children: [
                      {
                          label: "task1",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task2",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task3",
                          children: [
                              {
                                  label: "task1",
                                  href: "taskaction1",
                                  text: "you can do this action",
                              },
                          ],
                      },
                  ],
              },
          ],
      },
      {
          label: "Nerve 2",
          children: [
              {
                  label: "subNerve2",
                  children: [
                      {
                          label: "task1",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task2",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task3",
                          children: [
                              {
                                  label: "task1",
                                  href: "taskaction1",
                                  text: "you can do this action",
                              },
                          ],
                      },
                  ],
              },
          ],
      },
      {
          label: "Nerve 3",
          children: [
              {
                  label: "subNerve3",
                  children: [
                      {
                          label: "task1",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task2",
                          href: "taskaction1",
                          text: "you can do this action",
                      },
                      {
                          label: "task3",
                          children: [
                              {
                                  label: "task1",
                                  href: "taskaction1",
                                  text: "you can do this action",
                              },
                          ],
                      },
                  ],
              },
          ],
      },
  ];

    const boxes = React.useMemo(
        () =>
            data.map((value) => {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 20);
                return { value, row, col };
            }),
        []
    );

    if (!boxes) return null;

    return (
        <div className="container">
            {boxes.map((b, idx) => (
                <React.Fragment key={idx}>
                    <span key={idx} className="box" style={{ gridColumnStart: b.col, gridRowStart: b.row }}>
                        <a href={`#example${idx}`}>{b.value.label}</a>
                    </span>
                    <div className="lightbox" id={`example${idx}`}>
                        <figure>
                            <a href="#" onClick={(e) => setShowResult(false)} className="close"></a>
                            <figcaption>{showResult ? <Results /> : b.value.children.map((values, id) => <ListItem items={values} onShowResult={() => setShowResult(true)} />)}</figcaption>
                        </figure>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

// https://stackblitz.com/edit/react-doprrk?file=src%2Fstyle.scss