import {gql} from '@apollo/client';

export const GET_STARSHIPS = gql`
  query GetAllStarShips {
    allStarships {
      starships {
        MGLT
        cargoCapacity
        consumables
        costInCredits
        created
        crew
        hyperdriveRating
        id
        length
        manufacturers
        maxAtmospheringSpeed
        model
        name
        passengers
        starshipClass
      }
    }
  }
`;
