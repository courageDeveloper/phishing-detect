# Installing the packages
#install.packages("httr")
#install.packages("jsonlite")

# Loading packages
library(caret)
library(gmodels)
library(httr)
library(jsonlite)

# set working directory
setwd(dirname(file.choose()))
getwd()

#--------------------------------XGBoost-------------------------------------------

# Initializing API Call
call <- "http://localhost:5000/get_features"

# Getting details in API
get_feature_details <- GET(url = call)

# Content in the API
apicontent <- str(content(get_feature_details))

# Converting content to text
get_feature_text <- content(get_feature_details,
                            "text", encoding = "UTF-8")
#get_feature_text

# Parsing data in JSON
get_feature_json <- fromJSON(get_feature_text,
                             flatten = TRUE)
#get_feature_json

# Converting into dataframe
get_feature_dataframe <- as.data.frame(get_feature_json)
#remove id and url column
get_feature_dataframe <- get_feature_dataframe[c(-1, -2)]

#Load csv again but this time set stringsAsFactors = TRUE
phishingdata <- read.csv("dataset_phishing_web.csv", stringsAsFactors = TRUE)
#Remove URL feature
phishingdata = phishingdata[-1]

#Hot encode all the values to numerical values
phishingdata[] <- lapply(phishingdata, function(x) as.numeric(x))
phishingdata$status_var <- as.numeric(phishingdata$status_var)-1

#make train and test data sets
set.seed(12345)
#trn <- phishingdata
trn <- phishingdata[1:9144, ]
tst  <- phishingdata[9145:11430, ]

library(xgboost)

dtrain <- xgb.DMatrix(data = as.matrix(trn[,-22]), label = trn$status_var)
dtest <- xgb.DMatrix(data = as.matrix(get_feature_dataframe[-22]), label = get_feature_dataframe$status_var)

start.time <- Sys.time()#start the time before model creation
set.seed(12345)
model_xgb <- xgboost(data = dtrain, max.depth = 6, eta = 1, nthread = 4, nrounds = 10, objective = "binary:logistic")
end.time <- Sys.time()#end time after model creation
time.taken <- end.time - start.time#get the amount of time taken to create the model
#time.taken#print the time taken to create model

pred <- predict(model_xgb, dtest)
#print(length(pred))
#print(head(pred))
prediction <- as.numeric(pred > 0.5)
result <- print(head(prediction))
print(result)

# err <- mean(as.numeric(pred > 0.5) != tst$status_var)
# print(paste("test-error=", err))
# 
# importance_matrix <- xgb.importance(model = model_xgb)
# print(importance_matrix)
# xgb.plot.importance(importance_matrix = importance_matrix)
# 
# CrossTable(tst$status_var, prediction,
#            prop.chisq = FALSE, prop.c = FALSE, prop.r = FALSE,
#            dnn = c('actual status', 'predicted status'))
# result <- confusionMatrix(as.factor(prediction), as.factor(tst$status_var), mode = "everything", positive = "1")
# print(result)

#---------------------------------END-------------------------------------------------------
