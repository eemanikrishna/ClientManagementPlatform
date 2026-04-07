package com.advisor.automation.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ClientDetailsPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    public ClientDetailsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isClientNameDisplayed(String clientName) {
        try {
            // Dashboard now uses an h1 with class details-name and also has fallback heading text.
            WebElement nameHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.xpath("//h1[contains(@class,'details-name') or contains(.,'Client Profile')]")
            ));
            return nameHeader.getText() != null && nameHeader.getText().contains(clientName);
        } catch (Exception e) {
            return false;
        }
    }
}

