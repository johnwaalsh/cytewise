package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type CitationData struct {
	Author            string `json:"author"`
	Title             string `json:"title"`
	ContainerTitle    string `json:"containerTitle"`
	OtherContributors string `json:"otherContributors"`
	Version           string `json:"version"`
	Number            string `json:"number"`
	Publisher         string `json:"publisher"`
	PublicationDate   string `json:"publicationDate"`
	Location          string `json:"location"`
	DateAccessed      string `json:"dateAccessed"`
	URL               string `json:"url"`
	DOI               string `json:"doi"`
	Volume            string `json:"volume"`
	Issue             string `json:"issue"`
	Pages             string `json:"pages"`
	Edition           string `json:"edition"`
	Year              string `json:"year"`
	Month             string `json:"month"`
	Day               string `json:"day"`
}

type CitationRequest struct {
	Style CitationStyle `json:"style"`
	Data  CitationData  `json:"data"`
}

type CitationResponse struct {
	Citation string `json:"citation"`
	Style    string `json:"style"`
}

type CitationStyle string

const (
	APA             CitationStyle = "APA"
	MLA             CitationStyle = "MLA"
	ChicagoTurabian CitationStyle = "Chicago/Turabian"
	Harvard         CitationStyle = "Harvard"
	IEEE            CitationStyle = "IEEE"
	VancouverNLM    CitationStyle = "Vancouver/NLM"
	AMA             CitationStyle = "AMA"
	CSE             CitationStyle = "CSE"
	Bluebook        CitationStyle = "Bluebook"
	ASA             CitationStyle = "ASA"
)

func enableCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func generateMLACitation(data CitationData) string {
	var parts []string

	if data.Author != "" {
		parts = append(parts, data.Author+".")
	}
	if data.Title != "" {
		parts = append(parts, `"`+data.Title+`."`)
	}
	if data.ContainerTitle != "" {
		parts = append(parts, data.ContainerTitle+",")
	}
	if data.OtherContributors != "" {
		parts = append(parts, data.OtherContributors+",")
	}
	if data.Version != "" {
		parts = append(parts, data.Version+",")
	}
	if data.Number != "" {
		parts = append(parts, data.Number+",")
	}
	if data.Publisher != "" {
		parts = append(parts, data.Publisher+",")
	}
	if data.PublicationDate != "" {
		parts = append(parts, data.PublicationDate+",")
	}
	if data.Location != "" {
		parts = append(parts, data.Location+".")
	}
	if data.URL != "" {
		dateAccessed := data.DateAccessed
		if dateAccessed == "" {
			dateAccessed = "Date"
		}
		parts = append(parts, fmt.Sprintf("Web. %s. <%s>.", dateAccessed, data.URL))
	}

	return strings.Join(parts, " ")
}

func generateAPACitation(data CitationData) string {
	var parts []string

	if data.Author != "" {
		parts = append(parts, data.Author)
	}
	if data.Year != "" {
		parts = append(parts, fmt.Sprintf("(%s).", data.Year))
	}
	if data.Title != "" {
		parts = append(parts, data.Title+".")
	}
	if data.ContainerTitle != "" {
		parts = append(parts, data.ContainerTitle+",")
	}
	if data.Volume != "" {
		volumePart := data.Volume
		if data.Issue != "" {
			volumePart += fmt.Sprintf("(%s)", data.Issue)
		}
		parts = append(parts, volumePart+",")
	}
	if data.Pages != "" {
		parts = append(parts, data.Pages+".")
	}
	if data.DOI != "" {
		parts = append(parts, fmt.Sprintf("https://doi.org/%s", data.DOI))
	} else if data.URL != "" {
		parts = append(parts, data.URL)
	}

	return strings.Join(parts, " ")
}

func generateCitation(style CitationStyle, data CitationData) string {
	switch style {
	case MLA:
		return generateMLACitation(data)
	case APA:
		return generateAPACitation(data)
	default:
		return "Citation format coming soon..."
	}
}

func citationHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CitationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	citation := generateCitation(req.Style, req.Data)

	response := CitationResponse{
		Citation: citation,
		Style:    string(req.Style),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func main() {
	http.HandleFunc("/api/generate-citation", citationHandler)
	http.HandleFunc("/api/health", healthHandler)

	port := "8080"
	fmt.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
