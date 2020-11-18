import {Grid} from '@material-ui/core'
import SessionByDay from './SessionByDay'
import SessionByHour from './SessionByHour'
import RetentionCohort from './RetentionCohort'
import TileContainer from './TileContainer';
import OSPie from './OSPie';
import Map from './Map';
import AllEvents from './AllEvents';

function App() {

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      >
        <TileContainer>
          <SessionByDay />
        </TileContainer>
        <TileContainer>
          <SessionByHour />
        </TileContainer>
        <TileContainer>
          <RetentionCohort />
        </TileContainer>
        <TileContainer>
          <OSPie />
        </TileContainer>
        <TileContainer>
          <Map />
        </TileContainer>
       
        <TileContainer>
          <AllEvents />
        </TileContainer>
       
         </Grid>
  );
}

export default App;
