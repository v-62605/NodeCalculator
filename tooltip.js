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
  content: `<span style="color: rgb(0, 255, 0)">Number of units generated by one node per day (REQUIRED)<span>`,
})

tippy('#NP', {
  content: `<span style="color: rgb(0, 255, 0)">Unit price of a single node (REQUIRED)<span>`,
})

tippy('#INC', {
  content: `<span style="color: rgb(0, 255, 0)">Number of nodes initially purchased<span>`,
})

// tippy('#FUS', {
//   content: `<span style="color: rgb(0, 255, 0)">Final number of units (this can be left blank)<span>`,
// })

tippy('#TC', {
  content: `<span style="color: rgb(0, 255, 0)">How much time in days should the compounding algorithm run for<span>`,
})

tippy('#NC', {
  content: `<span style="color: rgb(0, 255, 0)">Maximum number of nodes that can be bought (if there is no limit, then it can be left blank)<span>`,
})

tippy('#DUF', {
  content: `<span style="color: rgb(0, 255, 0)">Number of units required daily after all compounding is done<span>`,
})

tippy('#RR', {
  content: `<span style="color: rgb(0, 255, 0)">Percentage of units to reinvest into buying new nodes (in decimal form) (REQUIRED)<span>`,
})