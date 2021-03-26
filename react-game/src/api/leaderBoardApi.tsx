const delay = (ms: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(resolve, ms, ms);
  });
}

const leaders = [ // Player names from here - https://minesweeper.online/season-leaders
  ['DEEWQMinesweeper', 'senior', 121],
  ['USmtanzer', 'senior', 123],
  ['AUScar', 'senior', 125],
  ['GRAris', 'senior', 126],
  ['USafgg', 'senior', 175],
  ['LTGini5525', 'senior', 192],
  ['USMoCol', 'senior', 222],
  ['RULain_Kolliner', 'senior', 9001],
  ['USFracturedAnvil', 'middle', 123],
  ['DEVidar', 'middle', 1000],
]

export interface LeaderBoardItem {
  username: string,
  difficulty: string,
  timer: number,
}

export const fetchLeaders = () => delay(1000).then(
  () => leaders.map(row => ({
    username: row[0],
    difficulty: row[1],
    timer: row[2]
  } as LeaderBoardItem))
);
