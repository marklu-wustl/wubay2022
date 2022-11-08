import {Box, Card, Checkbox, Divider, FormControlLabel, Rating, TextField,} from "@mui/material";
import {FlexBetween, FlexBox} from "./flex-box";
import {H5, H6, Paragraph, Span} from "./Typography";

const ProductFilterCard = () => {
  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      <H6 mb={1.25}>Categories</H6>

      {categroyList.map((item) =>

          <Paragraph
            py={0.75}
            fontSize="14px"
            color="grey.600"
            key={item.title}
            className="cursor-pointer"
          >
            {item.title}
          </Paragraph>

      )}

      <Divider
        sx={{
          mt: 2,
          mb: 3,
        }}
      />

      <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField placeholder="0" type="number" size="small" fullWidth />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField placeholder="250" type="number" size="small" fullWidth />
      </FlexBetween>

      <Divider
        sx={{
          my: 3,
        }}
      />

      {/*<H6 mb={2}>Brands</H6>*/}
      {/*{brandList.map((item) => (*/}
      {/*  <FormControlLabel*/}
      {/*    key={item}*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*    }}*/}
      {/*    label={<Span color="inherit">{item}</Span>}*/}
      {/*    control={<Checkbox size="small" color="secondary" />}*/}
      {/*  />*/}
      {/*))}*/}

      {/*<Divider*/}
      {/*  sx={{*/}
      {/*    my: 3,*/}
      {/*  }}*/}
      {/*/>*/}

      {/*{otherOptions.map((item) => (*/}
      {/*  <FormControlLabel*/}
      {/*    key={item}*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*    }}*/}
      {/*    label={<Span color="inherit">{item}</Span>}*/}
      {/*    control={<Checkbox size="small" color="secondary" />}*/}
      {/*  />*/}
      {/*))}*/}

      {/*<Divider*/}
      {/*  sx={{*/}
      {/*    my: 3,*/}
      {/*  }}*/}
      {/*/>*/}

      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{
            display: "flex",
          }}
          key={item}
        />
      ))}

      {/*<Divider*/}
      {/*  sx={{*/}
      {/*    my: 3,*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<H6 mb={2}>Colors</H6>*/}
      {/*<FlexBox mb={2} flexWrap="wrap" gap={1}>*/}
      {/*  {colorList.map((item) => (*/}
      {/*    <Box*/}
      {/*      flexShrink={0}*/}
      {/*      sx={{*/}
      {/*        width: 25,*/}
      {/*        height: 25,*/}
      {/*        bgcolor: item,*/}
      {/*        cursor: "pointer",*/}
      {/*        borderRadius: "50%",*/}
      {/*      }}*/}
      {/*      key={item}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</FlexBox>*/}
    </Card>
  );
};

const categroyList = [
  {
    title: "All Categories",
  },
  {
    title: "Textbook",
  },
  {
    title: "Grocery",
  },
  {
    title: "Clothing & Beauty",
  },
  {
    title: "Electronic & Entertainment",
  },
  {
    title: "Furniture & Household",
  },
  {
    title: "Office & School Supplies",
  },
  {
    title: "Other",
  }
];
const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];
export default ProductFilterCard;
