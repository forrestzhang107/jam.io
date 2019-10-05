function removeItem(arr, item) {
  const i = arr.indexOf(item)
  if (i > -1) arr.splice(i, 1)
}

exports.removeItem = removeItem
