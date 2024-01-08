# FinTrack

FinTrack is a full-stack equity analysis web application providing comprehensive analytics into market activity. A financial REST API with Flask was developed to deliver in-depth equity analytics including historical price data, key financial metrics, and current news analyzed with FinBERT, a pre-trained natural language processing model to analyze sentiment of financial text developed by ProsusAI. Additionally, Google's Firebase backend service was implemented for authentication and Cloud Firestore for its cloud database allowing personalized watchlist making.

(Link to backend)[https://github.com/13lack13lood/FinTrack-Backend]

### Technologies Used
- NextJS
- React
- Tailwind
- Flask
- Firebase
- yfinance
- Pandas
- Web scraping with BeautifulSoup

### Current Features
- Explore trending stocks (most active, gainers, losers)
- Tracks popular stock indicies (S&P 500, Dow Jones Industrial Average, NASDAQ Composite) and displays historical price data
- Provides in-depth analytics for each stock
  - Historical price data
  - Key financial metrics
  - Current news analyzed with FinBERT by ProsusAI
  - Balance sheets (yearly and quarterly)
  - Income sheets (yearly and quarterly)
  - Cashflow sheets (yearly and quarterly)
- Current trending general stock news
- Authentication
- Personalized watchlist that tracks current price data including: Open, Close, High, Low, Volume
