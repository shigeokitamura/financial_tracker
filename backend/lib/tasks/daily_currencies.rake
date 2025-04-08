require "uri"
require "date"
require "json"
require "rest-client"

namespace :daily_currencies do
  desc "Fetch daily currencies from currencyapi.com"
  task :fetch, [ "date" ] => :environment do |task, args|
    date = args.date ? Date.parse(args.date) : Date.yesterday
    if date >= Date.today
      Rails.logger.error "Error: date must be before today. Use `rake daily_currencies:fetch[YYYY-MM-DD]`"
      exit 1
    end

    if CurrencyHistory.exists?(date: date)
      Rails.logger.error "Error: currencies for #{date} already exist. Use `rake daily_currencies:fetch[YYYY-MM-DD]`"
      exit 1
    end

    uri = URI::HTTPS.build(
      host: "api.currencyapi.com",
      path: "/v3/historical",
      query: "apikey=#{ENV.fetch('CURRENCYAPI_KEY')}&date=#{date.strftime('%Y-%m-%d')}"
    )

    response = RestClient.get(uri.to_s)
    if response.code != 200
      Rails.logger.error "Failed to fetch currencies: #{response.code} #{response.body}"
      exit 1
    end

    response_json = JSON.parse(response.body)

    currencies = []
    response_json["data"].keys.each do |key|
      data = response_json["data"][key]
      currencies << {
        currency: data["code"],
        value: data["value"],
        date: date
      }
    end

    CurrencyHistory.insert_all(currencies)
  end
end
