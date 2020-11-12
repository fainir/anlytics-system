import {Grid} from '@material-ui/core'
import SessionByDay from './SessionByDay'
import SessionByHour from './SessionByHour'
import RetentionCohort from './RetentionCohort'
import TileContainer from './TileContainer';

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
        </TileContainer>
        <TileContainer>
        </TileContainer>
       
         </Grid>
  );
}

export default App;
