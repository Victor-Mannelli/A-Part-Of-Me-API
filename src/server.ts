import app from "./app";
import "./setup"

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on ${port}`));
