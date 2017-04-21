import { expect } from 'chai'
import {
  daysOfWeek,
  monthNames,
  monthStartingWeekDates,
  parseDateOrToday
} from './date'
import moment from 'moment'

describe('monthStartingWeekDates', () => {
  const dateFormat = 'MM/DD/YYYY'
  moment.locale('en')

  describe('when a month starts on a start-of-week (sunday)', () => {
    const date = moment('01/01/2017', dateFormat)

    it('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date)
      const formatedWeeks = weeks.map(week => week.format(dateFormat))
      const expectedWeeks = [
        '01/01/2017',
        '01/08/2017',
        '01/15/2017',
        '01/22/2017',
        '01/29/2017'
      ]

      expect(formatedWeeks).to.deep.equal(expectedWeeks)
    })
  })

  describe('when a month ends on a end-of-week (saturday)', () => {
    const date = moment('12/01/2016', dateFormat)

    it('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date)
      const formatedWeeks = weeks.map(week => week.format(dateFormat))
      const expectedWeeks = [
        '11/27/2016',
        '12/04/2016',
        '12/11/2016',
        '12/18/2016',
        '12/25/2016'
      ]

      expect(formatedWeeks).to.deep.equal(expectedWeeks)
    })
  })

  describe('when a month starts on a end-of-week and end on a start-of-week', () => {
    const date = moment('04/01/2017', dateFormat)

    it('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date)
      const formatedWeeks = weeks.map(week => week.format(dateFormat))
      const expectedWeeks = [
        '03/26/2017',
        '04/02/2017',
        '04/09/2017',
        '04/16/2017',
        '04/23/2017',
        '04/30/2017'
      ]

      expect(formatedWeeks).to.deep.equal(expectedWeeks)
    })
  })
})

describe('daysOfWeek', () => {
  it('returns the days of week', () => {
    const days = daysOfWeek()
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    expect(days).to.deep.equal(expectedDays)
  })

  it('returns the days of week in the given locale', () => {
    const days = daysOfWeek('es')
    const expectedDays = [
      'lun.',
      'mar.',
      'mié.',
      'jue.',
      'vie.',
      'sáb.',
      'dom.'
    ]

    expect(days).to.deep.equal(expectedDays)
  })
})

describe('monthNames', () => {
  it('returs month names in the given locale', () => {
    const months = monthNames('es')
    const expectedMonths = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ]

    expect(months).to.deep.equal(expectedMonths)
  })
})

describe('parseDateOrToday', () => {
  const dateFormat = 'MM/DD/YYYY'

  describe('passing a string date', () => {
    const date = parseDateOrToday('01/01/2016')

    it('returns a parsed date', () => {
      const expectedDate = moment('01/01/2016', dateFormat)

      expect(date.format(dateFormat)).to.equal(expectedDate.format(dateFormat))
    })
  })

  describe('passing no valid string date', () => {
    const date = parseDateOrToday('01/01')

    it('returns a parsed date', () => {
      const expectedDate = moment()

      expect(date.format(dateFormat)).to.equal(expectedDate.format(dateFormat))
    })
  })
})
