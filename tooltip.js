tippy.setDefaultProps({
  placement: 'left',
  arrow: false,
  theme: 'translucent',
  animation: 'scale-extreme',
  followCursor: false,
  allowHTML: true,
  delay: [500,0],
})

tippy('#DU', {
  content: `<span style="color: rgb(0, 255, 0)">Number of units produced by one node daily<span>`,
})

tippy('#NP', {
  content: `<span style="color: rgb(0, 255, 0)">Unit price of a single node<span>`,
})

tippy('#INC', {
  content: `<span style="color: rgb(0, 255, 0)">Number of nodes you initially begin with<span>`,
})

tippy('#FUS', {
  content: `<span style="color: rgb(0, 255, 0)">Final number of units (this can be left blank)<span>`,
})

tippy('#TC', {
  content: `<span style="color: rgb(0, 255, 0)">Time limit in days<span>`,
})

tippy('#NC', {
  content: `<span style="color: rgb(0, 255, 0)">Maximum number of nodes to buy (if there is no limit, then it can be left blank)<span>`,
})

tippy('#DUF', {
  content: `<span style="color: rgb(0, 255, 0)">Number of units produced daily that is required<span>`,
})

tippy('#RR', {
  content: `<span style="color: rgb(0, 255, 0)">Percentage of units to reinvest into buying new nodes (in decimal form)<span>`,
})