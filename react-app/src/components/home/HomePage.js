import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TEMPLATES = [
  {
    id: 1,
    title: 'Cutest Dog Breeds',
    description: 'Rank your favorite dog breeds.',
  },
  {
    id: 2,
    title: 'Tastiest Tropical Fruits',
    description: 'Compare the best tropical fruits.',
  },
  {
    id: 3,
    title: 'Best Rock Bands',
    description: 'Rank the greatest bands of all time.',
  },
  {
    id: 4,
    title: 'Yummiest Desserts',
    description: 'Which desserts deserve S-tier?',
  },
  {
    id: 5,
    title: 'Favorite Holidays',
    description: 'Rank the best holidays.',
  },
  {
    id: 6,
    title: 'Best Monkeys',
    description: 'Rate the coolest monkeys.',
  },
];

export default function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          mt: 6,
          width: '100%',
          minHeight: { xs: 'auto', md: 460 },
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 8 },
          display: 'flex',
          alignItems: 'center',
          background:
            'linear-gradient(135deg, #111827 0%, #1f2937 45%, #374151 100%)',
          color: 'white',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -70,
            right: 180,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 760,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#d1d5db',
                mb: 2,
              }}
            >
              Welcome to MetaTier
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.02,
                mb: 2,
              }}
            >
              Rank, compare, and explore your favorites.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: '#d1d5db',
                maxWidth: 620,
                mb: 4,
              }}
            >
              Create tier lists, save your rankings, compare them with others,
              and check out global averages across popular templates.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Button
                component={Link}
                to="/templates"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  backgroundColor: '#FF7F7F',
                  color: 'white',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#ff6b6b',
                    boxShadow: 'none',
                  },
                }}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/global"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.35)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                Explore Global Rankings
              </Button>

              <Button
                component={Link}
                to="/my-rankings"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.35)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                Saved Rankings
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mt: 8, mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '1.75rem', md: '2.2rem' },
              fontWeight: 800,
              color: '#111827',
              mb: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Check Out Our Templates
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              color: '#6b7280',
              mb: 4,
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: 600,
            }}
          >
            Browse a variety of community-created templates and start ranking your favorites.
          </Typography>

          {/* Preview cards (NOT clickable) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 3,
              mb: 5,
            }}
          >
            {TEMPLATES.map((template) => (
              <Box
                key={template.id}
                sx={{
                  borderRadius: '18px',
                  p: 3,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    color: '#111827',
                    mb: 1,
                  }}
                >
                  {template.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                  }}
                >
                  {template.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Single CTA */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Button
              component={Link}
              to="/templates"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                backgroundColor: '#111827',
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#1f2937',
                  boxShadow: 'none',
                },
              }}
            >
              Browse All Templates
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
