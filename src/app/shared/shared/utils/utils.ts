export const checkObjectDate = (object: any): boolean => {
  return !!object && Object.keys(object)?.length > 0 ?true: false
}

export const ceroDate = (data: any[]): any => {
  return data?.[0]
}

export const matRoundNumber = (devimalNumber: any): number =>{
  return Math.round(devimalNumber)
}

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const sliceData = (data: any[]): any => {
  return data.slice(1, 7)
}

export const urlIcon = (code: string): any =>{
  return 'https://www.weatherbit.io/static/img/icons/'+code+'.png'
}

export const meterToKilometer = (metres: any): any =>{
  return ((Number(metres) * 3600) / 1000).toFixed(2)
}

export const getHour = (timeStamp: any): any => {
  const date = new Date(timeStamp * 1000)
  const hour = date.getHours()
  const minutes = date.getMinutes().toString().split('')?.length === 1 ? '0'+date.getMinutes() : date.getMinutes()
  let isMorning = Number(hour) > 12 ? 'p.m.' : 'a.m.'
  return hour+':'+minutes+' '+isMorning;
}
