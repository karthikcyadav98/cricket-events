import gql from 'graphql-tag';

export const newSchedule = gql`
query newSchedule(
  $type: String!
  $status: String!
  $page: Int!
){
  newSchedule(type: $type, status: $status, page: $page) {
    matches {
      matchName
      matchType
      matchStatus
      startDate
      homeTeamName
      awayTeamName
      league
      matchdate
      venue
    }
    seriesID
    matchType
    seriesName
    seriesView
    league
    seriesAvailable
  }  
}
`;