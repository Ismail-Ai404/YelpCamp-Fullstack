# YelpCamp API Test Script
Write-Host "Testing YelpCamp API Endpoints..." -ForegroundColor Green

# Test 1: Get all campgrounds
Write-Host "Testing: GET /api/campgrounds" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/campgrounds" -Method GET -Headers @{"Accept" = "application/json"}
    $content = $response.Content | ConvertFrom-Json
    Write-Host "SUCCESS: Found $($content.campgrounds.Count) campgrounds" -ForegroundColor Green
    
    if ($content.campgrounds.Count -gt 0) {
        $campgroundId = $content.campgrounds[0]._id
        $campgroundTitle = $content.campgrounds[0].title
        Write-Host "Sample campground: $campgroundTitle (ID: $campgroundId)"
        
        # Test 2: Get specific campground
        Write-Host "Testing: GET /api/campgrounds/$campgroundId" -ForegroundColor Yellow
        $detailResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/campgrounds/$campgroundId" -Method GET -Headers @{"Accept" = "application/json"}
        $detailContent = $detailResponse.Content | ConvertFrom-Json
        Write-Host "SUCCESS: Retrieved campground details" -ForegroundColor Green
        Write-Host "   Title: $($detailContent.campground.title)"
        Write-Host "   Price: $($detailContent.campground.price)"
        Write-Host "   Location: $($detailContent.campground.location)"
        
        # Test 3: Get reviews for campground
        Write-Host "Testing: GET /api/campgrounds/$campgroundId/reviews" -ForegroundColor Yellow
        $reviewsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/campgrounds/$campgroundId/reviews" -Method GET -Headers @{"Accept" = "application/json"}
        $reviewsContent = $reviewsResponse.Content | ConvertFrom-Json
        Write-Host "SUCCESS: Found $($reviewsContent.reviews.Count) reviews for this campground" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Failed to connect to API" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 4: Frontend availability
Write-Host "Testing: Frontend availability" -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173/" -Method GET
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "SUCCESS: Frontend is serving React application" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Frontend not accessible" -ForegroundColor Red
}

Write-Host "API Testing Complete!" -ForegroundColor Green
Write-Host "Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
